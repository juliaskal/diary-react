from typing import Annotated
from fastapi import FastAPI, Request, Body
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from dependencies import PostServiceDependency, FolderServiceDependency
from models import Post


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/posts", response_model=list[Post])
async def get_posts(post_service: PostServiceDependency):
    return post_service.get_posts()


@app.get("/api/post/{post_id}", response_model=Post)
async def get_post(
    post_service: PostServiceDependency,
    post_id: str
):
    return post_service.get_post_by_id(post_id)


@app.post("/api/post/new")
async def new_post(
    form_data: Annotated[dict, Body()],
    post_service: PostServiceDependency
):
    post_id = post_service.create_post(form_data)
    return JSONResponse({"id": post_id})


@app.post("/api/post/update")
async def update_post(
    form_data: Annotated[dict, Body()],
    post_service: PostServiceDependency
):
    post_id = post_service.update_post(form_data)
    return JSONResponse({"id": post_id})


@app.delete("/api/post/{post_id}")
async def delete_post(post_id: str, post_service: PostServiceDependency):
    return post_service.delete_post(post_id)


@app.get("/api/folders")
async def get_folders(folder_sercice: FolderServiceDependency):
    return folder_sercice.get_list()
