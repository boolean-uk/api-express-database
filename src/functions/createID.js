function createID(data) {
   const newID = data.reverse().find((d) => d.id)
    return newID +1
}   

module.exports = createID
