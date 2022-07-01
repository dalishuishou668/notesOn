# 🐼 notesOn
notesOn lets you manage your notes in a simple way.

Live site: https://notes-on.herokuapp.com/

Documentation: https://github.com/dalishuishou668/notesOn/wiki/

# Technologies used
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

# Feature lists:

### 1. User Signup and Login on Homepage.
* Users can sign up for an account using their Email address.
* Users can log in and log out from their accounts.
* Logged in users will be directed to their own pages.
* Users cannot access to main features without log in.
* Logged out users will be directed to the home page.

### 2. Notebooks
* Users can create notebooks.
* Users can view all of their notebooks.
* Users can update the content of a single notebooks.
* Users can delete notebooks.

### 3. Notes
* Users can add notes.
* Users can read all their notes.
* User can read all notes from a single notebook.
* Users can edit a single note.
* Users can delete their notes.

### 4. Search
* Users can quickly search their notes and access search results. 

# Landing Page
![4ed3e4067517b732280ccb686473cfa](https://user-images.githubusercontent.com/92266749/176960207-28818a6f-0694-43a4-a34a-e2437d526d2a.png)

# Login Page
![e2e7fcd3c50f70e431d4e39256c0471](https://user-images.githubusercontent.com/92266749/176960518-35d19e78-ffa1-42c7-9062-f353642bf7cb.png)

# Main Page
![3ceeddc79062aeb397bd68294d01032](https://user-images.githubusercontent.com/92266749/176960284-a340410e-5fba-4a4b-b4c3-29d0169ba940.png)

# Notebook Page
![9cd2b6f8dcdae2df35bc8e611bed376](https://user-images.githubusercontent.com/92266749/176960572-9912949b-16fc-4c50-af2f-f6cd3633e300.png)

# Search Page
![a24417354f6c4e6406f90a47258fa09](https://user-images.githubusercontent.com/92266749/176960657-6aaf84cb-25c0-4910-91b1-0c6b0dcbe39d.png)

# Run Locally

* Clone the project
  git clone https://github.com/dalishuishou668/notesOn.git

* Go to the project directory
  cd notesOn

* Install dependencies
  npm install

* Start the server
  npm start
  
# Environmental variables

To run this project, you will need to add the following environment variables to your .env file.

PORT=5000
DB_USERNAME=auth_app
DB_PASSWORD=«auth_app user password»
DB_DATABASE=auth_db
DB_HOST=localhost
JWT_SECRET=«generate_strong_secret_here»
JWT_EXPIRES_IN=604800
  
# Database setup

  psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"
  npx dotenv sequelize db:create
  npx dotenv sequelize db:migrate
  npx dotenv sequelize db:seed:all
  --> drop: npx dotenv sequelize db:drop

# Appendix

Icons credited to Font awesome, and flaticon.

