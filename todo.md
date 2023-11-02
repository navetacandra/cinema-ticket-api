## TODO

- utils
  - [mysql](./utils/mysql.js) [✅] [Last update: 3 Nov 2023]
  - [jwt](./utils/jwt.js) [✅] [Last update: 3 Nov 2023]
  - [token](./utils/token.js) [✅] [Last update: 3 Nov 2023]
- models
  - users
  - user_token
  - schedule
  - movies
  - cinemas
  - studios
  - seats
  - shows
  - books
  - checkouts
- middleware
  - authenticatedOnly
  - unauthenticatedOnly
  - adminOnly
- controllers
  - login
    ```js
    { username: string, password: string }
    ```
  - register
    ```js
    { name: string, username: string, password: string }
    ```
  - add_movie [adminOnly]
    ```js
    { name: string, genre: string, poster_url: string, synopsis: string, rating: number }
    ```
  - update_movie [adminOnly]
    ```js
    { id: number, name: string, genre: string, poster_url: string, synopsis: string, rating: number }
    ```
  - delete_movie [adminOnly]
    ```js
    { id: number }
    ```
  - get_all_movie
  - find_movie
    ```js
    { name: string }
    ```
  - add_cinemas [adminOnly]
    ```js
    { name: string, address: string }
    ```
  - update_cinemas [adminOnly]
    ```js
    { id: number, name: string, address: string }
    ```
  - delete_cinemas [adminOnly]
    ```js
    { id: number }
    ```
  - get_all_cinemas
  - find_cinemas
    ```js
    { query: string }
    ```
  - add_studios [adminOnly]
    ```js
    { cinema_id: number, name: string }
    ```
  - update_studios [adminOnly]
    ```js
    { id: number, cinema_id: number, name: string }
    ```
  - delete_studios [adminOnly]
    ```js
    { id: number }
    ```
  - get_all_studios
  - find_studios
    ```js
    { query: string }
    ```
  - add_seats [adminOnly]
    ```js
    { studio_id: number, name: string }
    ```
  - update_seats [adminOnly]
    ```js
    { id: number, studio_id: number, name: string }
    ```
  - delete_seats [adminOnly]
    ```js
    { id: number }
    ```
  - get_all_seats
  - find_seats
    ```js
    { query: string }
    ```
  - add_shows [adminOnly]
    ```js
    { studio_id: number, movie_id: number, schedule_id: number, price: number, date: string }
    ```
  - update_shows [adminOnly]
    ```js
    { id: number, studio_id: number, movie_id: number, schedule_id: number, price: number, date: string }
    ```
  - delete_shows [adminOnly]
    ```js
    { id: number }
    ```
  - get_all_shows
  - find_shows
    ```js
    { id: number }
    ```
  - add_books
    ```js
    { user_id: number, show_id: number, seat_id: number, count: number }
    ```
  - delete_books
    ```js
    { id: number }
    ```
  - get_books_history
    ```js
    { user_id: number }
    ```
  - checkout
    ```js
    { book_id: number }
    ```
