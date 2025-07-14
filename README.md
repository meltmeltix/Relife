![Relife](https://raw.githubusercontent.com/meltmeltix/Relife/refs/heads/main/github/header.png)

<p align="center">
  <strong>🌱 A social media dedicated to plants 🌱</strong>
</p>

<br>

## 🤔 About

Relife is a social media platform that focuses mainly on discussions about plants, inspired by other renowned social media platforms, built using Tailwind CSS, Daisy UI, Express.js and SQLite.

This website is the main assignment of the course [Web Programming Methodologies](https://of.uniupo.it/syllabus/didattica.php/en/2023/1932#176019), part of the 2023/2024 Academic Program.

**[Explanation video](https://youtu.be/jhKaZLBLBlw)**

<br>

## 🖥️ Showcase

![Relife Design File](https://raw.githubusercontent.com/meltmeltix/Relife/refs/heads/main/github/preview.png)

<p align="center">
	<a href="https://www.figma.com/design/UVCyfAp3Nr8tvzCmPL9ajq/Relife?node-id=0%3A1&t=pBeeAuAH9S27GSPO-1">
		<img src="https://raw.githubusercontent.com/meltmeltix/Relife/refs/heads/main/github/open%20in%20figma.png" height="45"/>
	</a>
</p>

<br>

## ✒️ Details

The application's user concept consists of three different types of users. Each of the user types will be able to perform certain actions based off of their role:

- ❔ **Guest** - Unregistered user
  - Create an account
  - Explore the global, popular feed
  - Check users profile: can only see posts
- 👨‍💻 **User** - Registered user
  - All of the above: can now see replies and media of a user
  - Account creation, login and change password
  - Interact with posts: like, comment and share
- 🔨 **Moderator** - Takes care of moderating the feed
  - All of the above
  - Delete posts or comments

<br>

## ⚙️ Installation

To download and install the project:
1. Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), and then install [Node.JS](https://nodejs.org/en/download/) on your system.
2. Clone this repository with `https://github.com/meltmeltix/Relife.git`
3. With your terminal, go into the cloned repository's folder
4. Install the node modules with `npm install`
5. And after that, either:
   1. Run `npm run dev` to run the server, while watching project changes and have tailwind compile the CSS;
   2. Or run `npm run start` to run the server.

### 🔑 Test Users

- User
  - Handle: `user`
  - Mail: `user@relife.com`
  - Password: `user`
- Moderator
  - Handle: `moderator`
  - Mail: `moderator@relife.com`
  - Password: `moderator`

<br>

## 🧩 Modules
- [express and express-session](https://expressjs.com/): for backend management, routing, sessions and REST API requests.
- [sqlite3](https://sqlite.org/index.html): for data storting and DBs.
- [passportjs](https://www.passportjs.org/): authentication middleware.
- [bcrypt](https://www.npmjs.com/package/bcryptjs): password encryption/decryption.
- [connect-multiparty](https://github.com/expressjs/connect-multiparty?tab=readme-ov-file): form data exchange.
- [page](https://visionmedia.github.io/page.js/): client side routing.
- [tailwindcss](https://tailwindcss.com/): CSS framework for class compilation and management.
- [daisyui](https://daisyui.com/): component classes for DaisyUI.
- [toastify-js](https://apvarun.github.io/toastify-js/): front-end toasts.
