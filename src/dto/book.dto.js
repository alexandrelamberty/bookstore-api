const { AuthorDTO } = require("./author.dto");

class BookDTO {
  constructor({ id, title, description, cover, Genre, Publisher, Authors }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.cover = cover;
    this.genre = Genre;
    this.publisher = Publisher;
    this.authors = Authors
      ? Authors.map((author) => new AuthorDTO(author))
      : [];
    // FIXME: retail price ...
  }
}

module.exports = { BookDTO };
