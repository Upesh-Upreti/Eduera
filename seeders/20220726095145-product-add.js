'use strict';

const { DATE } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [{
      title: 'Medisys',
      category: "Service",
      price: 199,
      imageUrl: "https://eduera.net/uploads/images/service/7ea6dcb47308f226cfaa3995dc42fb0e1654580000.jpg",
      imageAlt: "Medisys",
      show: true,
      slug: "Medisys",
      shortDescription: "Eduera Advanced gives your college and students a comprehensive solution of E-learning solution, E Library, Personalized software and hardware for the library, there are e-journals, eBooks, video collection, thesis and dissertations, and are provided through a mobile webapp solution for accessing the E-Resources for your medical college.",
      longDescription: "Eduera Advanced gives your college and students a comprehensive solution of E-learning solution, E Library, Personalized software and hardware for the library, there are e-journals, eBooks, video collection, thesis and dissertations, and are provided through a mobile webapp solution for accessing the E-Resources for your medical college.MediSys is our e-learning solution partner has developed curriculum-based digital educational aids for medical courses. The formats typically combine crisp notes with a wide range of exhibits (illustrations, procedure videos, charts, animations), besides the complete range of audio-visual lectures, question banks, test-prep products, etc. In a self-study context, these modules provide enhanced understanding, practical exposure and practice readiness. Remedial/ supplementary education sessions are easy to schedule for small groups, while each student can access all materials at any time, from anywhere either on a personal device or in a library.Faculty can utilize different features of the packages to improve teaching/learning efficiencies exhibits and notes set to a curriculum, comprehensive and well-sequenced, a range of exercises and facilitator guidelines, demonstrations and practical guidance – all set to vastly enhance the overall classroom experience. Productivity rises as a consequence.Our new MBBS package includes the complete range of early clinical exposure (ECE) modules, materials of small-group discussions (SGD) and bedside clinics (BSC), DOAP/labs and practical sessions and essential skill development modules. Particular attention is paid to the manner in which clinical correlates are established, and horizontal/ vertical integration elements are addressed. The LMS is ideal for online teaching, automation of basic classroom functions, including formative assessments.",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});

  }
};
