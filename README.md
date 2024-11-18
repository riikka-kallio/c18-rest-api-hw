# Books Rest API's

This is my homework for rest API

---

## How to run locally
```sh
npm run start:dev
```

## How to use
### Adding a book
#### route: *POST* `api/v1/books`
example body:
```json
{
    "title": "Pride and prejudice",
    "author": "Jane Austen",
    "description": "Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. They must overcome the titular sins of pride and prejudice in order to fall in love and marry",
    "avatar_url": "https://cloud.firebrandtech.com/api/v2/image/111/9780785839866/CoverArtHigh/XL",
}
```

### Delete a book
#### route: *DELETE* `api/v1/books/:id`

### Update a book
#### route: *PUT* `api/v1/books/:id`
example body:
```json
{
    "author": "blabla",
}
```

### Get a book
#### route: *GET* `api/v1/books/:id`


### Get all books
#### route: *GET* `api/v1/books`
