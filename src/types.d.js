/**
  @typedef { "SELECT" | "INSERT" | "UPDATE" | "DELETE" } Statement
  @typedef { "books" | "pets" } TableName
  @typedef { { text: String, values: ( Number | String | Boolean )[] } } Query

  @typedef { { title: String, type: String, author: String, topic: String, publication_date: String, pages: Number } } BookValues
  @typedef { { name: String, age: Number, type: String, breed: String, has_microchip: Boolean } } PetValues

  @typedef { { id?: Number, title?: String, type?: String, author?: String, topic?: String, publication_date?: String, pages?: Number } } FilterBookValues
  @typedef { { id?: Number, name?: String, age?: Number, type?: String, breed?: String, has_microchip?: Boolean } } FilterPetValues

  @typedef { BookValues & { id: Number } } ExistingBookValues
  @typedef { PetValues & { id: Number } } ExistingPetValues
  
  @typedef { BookValues | PetValues } NewValues
  @typedef { FilterBookValues | FilterPetValues } FilterValues
  @typedef { ExistingBookValues | ExistingPetValues } ExistingValues

  @typedef { import("express").Request} Request
  @typedef { import("express").Response} Response
 */

const Types = {}

module.exports = Types