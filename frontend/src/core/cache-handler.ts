import { DB } from './db';
import { loadStorage, saveStorage, Storage, CacheData, allocStorage } from '../utils/storage';
import { ResData, API } from '../config/api';

class CacheHandler<T> {
  protected db:DB;
  protected data:CacheData<T> | null = null;
  private expireTime:number;
  private key:keyof Storage;

  private loadData:() => Promise<T>;

  constructor (
    db:DB,
    loadData:() => Promise<T>,
    key:(keyof Storage),
    expireTime:number = 1000 * 3600 * 24,
  ) {
    this.db = db;
    this.loadData = loadData;
    this.key = key;
    this.expireTime = expireTime;
  }

  // init is called in "get" for lazy initialization
  public _init () {
    const data:CacheData<T> = loadStorage(this.key) as any;
    this.data = data;
  }

  private async updateData() {
    if (!this.data) {
      this._init();
    }
    if (this.data && Date.now() - this.data.updated_at > this.expireTime) {
      try {
        const res = await this.loadData();
        this.save(res);
      } catch (e) {
        console.log(e);
      }
    }
  }

  public async get () : Promise<T> {
    if (this.data) {
      return this.data.data;
    } else {
      // this should never be triggered
      console.error('cache error');
      return new Promise(() => allocStorage()[this.key]);
    }
  }

  public save (data?:T) {
    if (data) {
      const updatedData = {
        updated_at: Date.now(),
        data,
      };
      this.data = updatedData;
    }
    if (this.data != null) {
      saveStorage(this.key, this.data as any);
    }
  }
}

export class FAQHandler extends CacheHandler<API.Get['/helpfaq']> {
  constructor (db:DB) {
    super(
      db,
      db.getFAQs,
      'faq',
    );
  }
}
