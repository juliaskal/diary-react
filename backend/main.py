from typing import Annotated
from fastapi import FastAPI, Request, Body
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from dependencies.dependencies import PostServiceDependency


app = FastAPI()

app.mount("/styles", StaticFiles(directory="static/css"))
app.mount("/js", StaticFiles(directory="static/js"))
app.mount("/images", StaticFiles(directory="static/images"))
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request, post_service: PostServiceDependency):
    posts = post_service.get_actual_posts()

    return templates.TemplateResponse("home.html", {"request": request, "posts": posts})


@app.get("/view-post/{post_id}", response_class=HTMLResponse)
async def view_post(
    request: Request,
    post_service: PostServiceDependency,
    post_id: str
):
    post = post_service.get_post_by_id(post_id)
    return templates.TemplateResponse("view_post.html", {"request": request, "post": post})


@app.get("/creating-post", response_class=HTMLResponse)
async def create_post(request: Request):
    return templates.TemplateResponse("create_post.html", {"request": request})


@app.post("/creating-post/recive", response_class=HTMLResponse)
async def receive_creating_data(
    form_data: Annotated[dict, Body()],
    post_service: PostServiceDependency
):
    post_id = post_service.create_post(form_data)

    return JSONResponse({"location": f"/view-post/{post_id}"})


@app.post("/delete-post", response_class=HTMLResponse)
async def delete_post(request: Request, post_service: PostServiceDependency):
    post_json = await request.json()
    post_service.delete_post(post_json.get("post_id"))

    return 'sucsess'


@app.get("/updating-post/{post_id}", response_class=HTMLResponse)
async def update_post(
    request: Request,
    post_service: PostServiceDependency,
    post_id: str
):
    post = post_service.get_post_by_id(post_id)

    return templates.TemplateResponse("update_post.html", {"request": request, "post": post})


@app.post("/updating-post/recive/{post_id}", response_class=HTMLResponse)
async def receive_updating_data(
    form_data: Annotated[dict, Body()],
    post_id: str,
    post_service: PostServiceDependency
):
    post_service.update_post_by_id(form_data, post_id)

    return JSONResponse({"location": f"/view-post/{post_id}"})
