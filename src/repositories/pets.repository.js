const db = require("../../db/index.js");
const stmtHelper = require("../helpers/statementHelpers.js");

const Types = require("../types.d.js");

/**
 *
 * @param { Types.FilterValues } [filter]
 * @returns { Promise<{pets: Types.ExistingPetValues[]}> }
 */
async function getPets(filter) {
  if (!filter || Object.keys(filter).length === 0) {
    filter = undefined
  }
  const stmt = stmtHelper.selectStmt("pets", filter);
  const result = await db.query(stmt);
  return { pets: result.rows };
}

/**
 *
 * @param { Number } id
 * @returns { Promise<{ pet: Types.ExistingPetValues }> }
 */
async function getPetById(id) {
  const result = await getPets({ id });
  return { pet: result.pets[0] };
}

/**
 *
 * @param { Types.PetValues } values
 * @returns { Promise<{ pet: Types.ExistingPetValues }> }
 */
async function insertPet(values) {
  const stmt = stmtHelper.insertRowStmt("pets", values);
  const result = await db.query(stmt);
  return { pet: result.rows[0] };
}

/**
 *
 * @param {Types.ExistingPetValues} values
 * @returns { Promise<{pet: Types.ExistingPetValues}> }
 */
async function updatePet(values) {
  const stmt = stmtHelper.updateRowStmt("pets", values);
  const result = await db.query(stmt);
  return { pet: result.rows[0] };
}

/**
 *
 * @param { Number } id
 * @returns { Promise<{pet: Types.ExistingPetValues}> }
 */
async function deletePet(id) {
  const stmt = stmtHelper.deleteRowStmt("pets", id);
  const result = await db.query(stmt);
  return { pet: result.rows[0] };
}

module.exports = {
  getPets,
  getPetById,
  insertPet,
  updatePet,
  deletePet,
};
