
评论api
http://127.0.0.1:8000/api/posts/1/comments/  get
http://127.0.0.1:8000/api/posts/1/comments/  post 
需要传值的数据{
    "post": id值,
    "content": "Your comment content here"
}
被添加的值
{
    "id": 1,
    "post": 3,
    "author": "alex",
    "content": "Your comment content here",
    "created_at": "2024-04-07T18:04:17.633933Z"
}

点赞api
http://127.0.0.1:8000/api/posts/13/likes/  GET 获取数据
需要被传值的数据{
    "likes_count": 3,
    "is_liked": false
}

http://127.0.0.1:8000/api/posts/13/like/   POST  添加
需要被传值的数据{
    "post": 13
}
获取的数据{
    "id": 8,
    "post": 13,
    "user": null,
    "created_at": "2024-04-08T23:29:23.629028Z"
}

http://127.0.0.1:8000/api/posts/13/like/   Delete  删除