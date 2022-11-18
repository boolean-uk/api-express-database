const supertest = require("supertest")
const app = require("../../../src/server.js")
const { pet1, pet2 } = require("../../fixtures/petData.js")
const createPet = require("../../helpers/createPet.js")
const insertPets = require("../../helpers/insertPets.js")

describe("Pets Endpoint", () => {
  describe("POST /pets", () => {

    it("will return 400 if missing fields", async () => {
      const response = await supertest(app).post("/pets").send({name: 'Joey', type: 'dog'})

      expect(response.status).toEqual(400)
      expect(response.body.error).toEqual(`missing fields: age, breed, microchip`)
    })
  })

  describe("GET /pets", () => {
    beforeEach(async () => {
      await createPet(Object.values(pet1))
      await createPet(Object.values(pet2))
    })

    it("will return a 404 status with message if no pet", async () => {
      const response = await supertest(app).get("/pets/3")

      expect(response.status).toEqual(404)
      expect(response.body.error).toEqual('no pet with id: 3')
    })
  })

  describe("GET /pets Pagination", () => {
    beforeEach(async () => {
      await insertPets()
    })

    it("response has pagination properties", async () => {
      const response = await supertest(app).get(`/pets?page=2&perPage=30`)

      expect(response.status).toEqual(200)
      expect(response.body.pets).not.toEqual(undefined)
      expect(response.body.page).toEqual(2)
      expect(response.body.per_page).toEqual(30)
    })

    it("will return page 2 only of 30 pets", async () => {
      const response = await supertest(app).get(`/pets?page=2&perPage=30`)

      expect(response.status).toEqual(200)
      expect(response.body.pets).not.toEqual(undefined)
      expect(response.body.pets.length).toEqual(30)
      expect(response.body.pets[0].id).toEqual(31)
      expect(response.body.pets[response.body.pets.length-1].id).toEqual(60)
    })

    it("will return 400 if pagination parameters are invalid", async () => {
      const response = await supertest(app).get(`/pets?page=1&perPage=9`)

      expect(response.status).toEqual(400)
      expect(response.body.error).toEqual(`parameter invalid perPage: 9 not valid. Accepted range is 10 - 50`)
    })

    it("will return 400 if pagination parameters are invalid", async () => {
      const response = await supertest(app).get(`/pets?page=1&perPage=51`)

      expect(response.status).toEqual(400)
      expect(response.body.error).toEqual(`parameter invalid perPage: 51 not valid. Accepted range is 10 - 50`)
    })

    it("pagination parameters are optional, have default values", async () => {
      const response = await supertest(app).get(`/pets`)

      expect(response.status).toEqual(200)
      expect(response.body.pets).not.toEqual(undefined)
      expect(response.body.pets.length).toEqual(20)
      expect(response.body.pets[0].id).toEqual(1)
      expect(response.body.pets[response.body.pets.length-1].id).toEqual(20)
    })
  })

  describe("PUT /pets", () => {
    beforeEach(async () => {
      await createPet(Object.values(pet1))
    })

    it("will return a 404 status with message if no pet", async () => {
      const response = await supertest(app).put("/pets/2").send(pet1)

      expect(response.status).toEqual(404)
      expect(response.body.error).toEqual('no pet with id: 2')
    })
  })

  describe("DELETE /pets", () => {
    beforeEach(async () => {
      await createPet(Object.values(pet1))
    })

    it("will return a 404 status with message if no pet", async () => {
      await supertest(app).delete("/pets/1")
      const response = await supertest(app).delete("/pets/1")

      expect(response.status).toEqual(404)
      expect(response.body.error).toEqual('no pet with id: 1')
    })
  })
})
