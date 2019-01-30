<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\PageObjects;
use App\Helpers\ConstantObjects;
use App\Http\Resources\QuoteResource;
use App\Http\Resources\StatusResource;
use App\Http\Resources\ThreadResources\ThreadBriefResource;
use App\Http\Resources\ThreadResources\TagProfileResource;
use Cache;

class PagesController extends Controller
{
    public function home()
    {
        return response()->success([
            'quotes' => QuoteResource::collection(PageObjects::recent_quotes()),
            'recent_added_chapter_books' => ThreadBriefResource::collection(PageObjects::recent_added_chapter_books()),
            'recent_responded_books' => ThreadBriefResource::collection(PageObjects::recent_responded_books()),
            'recent_responded_threads' => ThreadBriefResource::collection(PageObjects::recent_responded_threads()),
            'recent_statuses' => StatusResource::collection(PageObjects::recent_statuses())
        ]);
    }

    public function homethread()
    {
        return response()->success([
            'recent_responded_threads' => ThreadBriefResource::collection(PageObjects::recent_responded_threads()),
        ]);
    }

    public function homebook()
    {
        return response()->success([
            'recent_added_chapter_books' => ThreadBriefResource::collection(PageObjects::recent_added_chapter_books()),
            'recent_responded_books' => ThreadBriefResource::collection(PageObjects::recent_responded_books()),
        ]);
    }

    public function allTags()
    {
        $tags = ConstantObjects::allTags();
        return response()->success([
            'tags' => TagProfileResource::collection(ConstantObjects::allTags()),
        ]);
    }
}