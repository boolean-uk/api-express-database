const supertest = require("supertest")
const app = require("../../../src/server.js")
const { pet1, pet2 } = require("../../fixtures/petData.js")
const createPet = require("../../helpers/createPet.js")

describe("Pets Endpoint", () => {
  describe("POST /pets", () => {

    it("will create a new pet", async () => {
      const response = await supertest(app).post("/pets").send(pet1)

      expect(response.status).toEqual(201)
      expect(response.body.pet).not.toEqual(undefined)
      expect(response.body.pet.id).not.toEqual(undefined)

      for (prop in pet1) {
        expect(response.body.pet[prop]).toEqual(pet1[prop])
      }

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
