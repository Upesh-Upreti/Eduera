'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Blogs', [{
      title: 'RRR of Education & Learning',
      category: "Lifestyle",
      show: true,
      imageUrl: "https://eduera.net/uploads/images/service/7ea6dcb47308f226cfaa3995dc42fb0e1654580000.jpg",
      imageAlt: "Medisys",
      slug: "education",
      shortDescription: "Happyness is a state of mind.",
      longDescription: "Responsibility, Resources’ & Reach The need of taking resources for medical studies to a digital platform. Education is a word that comes along with another word which is responsibility. Responsibility for not only getting an education but responsibility for expenses endured by family, the responsibility of dreams to be fulfilled.  The burden of which leads to motivation and also depression in a few instances. This mixed response is also observed because of the other 2 R’s Resources and Reach. To fulfill the responsibility, we need adequate resources which consist of Reference materials, Books, and Journals which can be categorized as expensive or very expensive and it isn’t only one of the either which is sufficient, we may require a couple of them. Even if we can arrange the resources, yet the third “R” which is “Reach” comes into play. Availability of the resource and along with that reaching in the right time is also crucial. So, why wait when you can have it at your fingertips? Lets enter the world of digitalization with e-Library so that you can use the resource as and when you require it.",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Blogs', null, {});
  }
};
