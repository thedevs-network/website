# Contributing Guidelines

- [How to write for The Devs blog?](#posts)

## Posts

[The Devs blog](https://thedevs.network/blog) is an [open source](https://github.com/TheDevs-Network/website/tree/master/posts) blog where **anyone** can publish their aricles, provided it follows certain guidelines.

### Choosing a subject

- Make sure the subject you're choosing is interesting and has the potential for **high quality** content.

- Since our blog is pretty fresh, try to choose **trendy** topics on trendy languages, which will attract visitors, in turn helping them discover our community.

- That said, if you're unsure about your subject, you can open an issue and ask for feedback.

### Format

Our blog posts are written in Markdown. Make a copy of [`post-format.md`](post-format.md) in the [`/posts/`](/posts) folder and start writing!

### Post info

If you look at any of our [blog posts](https://github.com/TheDevs-Network/website/edit/master/posts/build-a-telegram-bot-with-node.js.md), you will notice that the first section, called **front matter**, contains the **post information**. This section will be **omitted** from the final article. It includes these fields:

- **title:** Post title in the blog.
- **img:** Alt name for the article's featured image. (More info in image section)
- **date:** Publishing date for your article, in _Y, M, D_ format.
- **author:** Name of the article's author _(you)_.
- **cats:** Categories, seprated by comma.
- **tags:** Tags, seprated by comma.

### Images

For the featured image of the article:
- Image size must be **800x450**
- Image format must be **jpg** and it should be optimized.
- Add the image to **/static/img/posts**.
- Rename it to match what you entered in the front matter above.

For images you use inside the article, create a folder in the **/static/img/posts**, add all the images there and reference to that properly.

**DO NOT use a copyrighted image, or an image that requires attribution.** You can use [Unsplash](https://unsplash.com/) if you need to use stock photos.

### Ready to create pull request

Add the post in [posts](https://github.com/TheDevs-Network/website/tree/master/posts) folder. Make sure all images are properly referenced.
> Note: If your post needs refining, others have the right to edit the content it is published.
