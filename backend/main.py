from typing import Annotated
from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dependencies import PostServiceDependency, FolderServiceDependency
from models import Post, Folder


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


@app.get("/api/folder/{folder_id}", response_model=Folder)
async def get_folder(
    folder_service: FolderServiceDependency,
    folder_id: str
):
    return folder_service.get_folder_by_id(folder_id)


@app.post("/api/folder/new")
async def new_folder(
    form_data: Annotated[dict, Body()],
    folder_service: FolderServiceDependency
):
    folder_id = folder_service.create_folder(form_data)
    return JSONResponse({"id": folder_id})


@app.post("/api/folder/update")
async def update_folder(
    form_data: Annotated[dict, Body()],
    folder_service: FolderServiceDependency
):
    folder_id = folder_service.update_folder(form_data)
    return JSONResponse({"id": folder_id})


@app.delete("/api/folder/with-notes/{folder_id}")
async def delete_cascade(
    folder_id: str,
    folder_service: FolderServiceDependency
):
    return folder_service.delete_cascade(folder_id)


@app.delete("/api/folder/save-notes/{folder_id}")
async def delete_set_null(
    folder_id: str,
    folder_service: FolderServiceDependency
):
    return folder_service.delete_set_null(folder_id)
