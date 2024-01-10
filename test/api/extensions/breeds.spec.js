const supertest = require("supertest")
const app = require("../../../src/server.js")
const insertPets = require("../../helpers/insertPets.js")

describe("breeds Endpoint", () => {
  describe("GET /breeds", () => {
    beforeEach(async () => {
      await insertPets()
    })

    it("returns all dog breeds", async () => {
      const response = await supertest(app).get("/breeds?type=dog")

      expect(response.status).toEqual(200)
      expect(response.body.breeds).not.toEqual(undefined)
      expect(response.body.breeds.length).toEqual(9)
      expect(response.body.breeds).toEqual([
        { breed: 'Australian Stumpy Tail Cattle Dog' },
        { breed: 'Cane Paratore' },
        { breed: 'Drentse Patrijshond' },
        { breed: 'Glen of Imaal Terrier' },
        { breed: 'Grand Griffon Vendéen' },
        { breed: 'Lupo Italiano' },
        { breed: 'Maremmano-Abruzzese Sheepdog' },
        { breed: 'Perro de Pastor Mallorquin' },
        { breed: 'West Highland White Terrier' }
      ])
    })

    it("returns all cat breeds", async () => {
      const response = await supertest(app).get("/breeds?type=cat")

      expect(response.status).toEqual(200)
      expect(response.body.breeds).not.toEqual(undefined)
      expect(response.body.breeds.length).toEqual(2)
      expect(response.body.breeds).toEqual([
        { breed: 'American Bobtail'},
        { breed: 'Chausie'}
      ])
    })

    it("returns 0 for unknown type", async () => {
      const response = await supertest(app).get("/breeds?type=ant")

      expect(response.status).toEqual(200)
      expect(response.body.breeds).not.toEqual(undefined)
      expect(response.body.breeds.length).toEqual(0)
    })
  })
})
