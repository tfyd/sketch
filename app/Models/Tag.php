<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $guarded = [];

    public function threads()
    {
        return $this->belongsToMany(Thread::class, 'tagging_threads', 'tag_id', 'thread_id');
    }
}
