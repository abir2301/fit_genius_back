"use strict";
const db = require("../src/models/");

const HP = db.hp;
const hpData = require("../src/constans/hp");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
for (let i = 0 ; i<hpData.length ; i++){
   const hp = hpData[i];
     await queryInterface.bulkInsert("HP", [hp], {});
}
    // hpData.map(async (data) => {
    //   try {
    //     // await HP.findOrCreate({
    //     //   where: data,
    //     //   default: data,
    //     // });
    //     await queryInterface.bulkInsert("HP", [data], {});
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("HP", null, {});
  },
};
