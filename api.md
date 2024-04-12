
comments api
http://127.0.0.1:8000/api/posts/1/comments/  get
http://127.0.0.1:8000/api/posts/1/comments/  post 
require data{
    "post": id,
    "content": "Your comment content here"
}
get data from api for postman test
{
    "id": 1,
    "post": 3,
    "author": "alex",
    "content": "Your comment content here",
    "created_at": "2024-04-07T18:04:17.633933Z"
}
///////////////////////////////////////////////////////////////////////////////
like api
http://127.0.0.1:8000/api/posts/13/likes/  GET 
retrun data{
    "likes_count": 3,
    "is_liked": false
}

http://127.0.0.1:8000/api/posts/13/like/   POST  create
require data{
    "post": 13
}
get data from api for postman test{
    "id": 8,
    "post": 13,
    "user": null,
    "created_at": "2024-04-08T23:29:23.629028Z"
}

http://127.0.0.1:8000/api/posts/13/like/   Delete  

//////////////////////////////////////////////////////////////////////////////////////////

收藏
http://127.0.0.1:8000/api/posts/13/bookmarks/  GET
retrun data from postman (test)
{
    "bookmarks_count": 0,
    "is_bookmarked": false
}

http://127.0.0.1:8000/api/posts/13/bookmark/  POST create



http://127.0.0.1:8000/api/posts/13/bookmark/  POST  
{
    "message": "Bookmark already exists."
}

http://127.0.0.1:8000/api/bookmarks/  GET  get all favoraties data from api