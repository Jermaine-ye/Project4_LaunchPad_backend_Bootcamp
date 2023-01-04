'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'gitHubSubmissions',
      [
        {
          cadetId: 1,
          chapterId: 22,
          repoUrl: 'https://github.com/adam/recipe-site',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cadetId: 1,
          chapterId: 23,
          repoUrl: 'https://github.com/adam/portfolio',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cadetId: 1,
          chapterId: 24,
          repoUrl: 'https://github.com/adam/world-clock',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cadetId: 1,
          chapterId: 25,
          repoUrl: 'https://github.com/adam/high-card',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cadetId: 1,
          chapterId: 26,
          repoUrl: 'https://github.com/adam/guess-the-word',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cadetId: 1,
          chapterId: 27,
          repoUrl: 'https://github.com/adam/frontend',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cadetId: 3,
          chapterId: 22,
          repoUrl: 'https://github.com/weiyu/recipe-site',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cadetId: 3,
          chapterId: 23,
          repoUrl: 'https://github.com/weiyu/portfolio',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cadetId: 3,
          chapterId: 24,
          repoUrl: 'https://github.com/weiyu/world-clock',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cadetId: 3,
          chapterId: 25,
          repoUrl: 'https://github.com/weiyu/high-card',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('gitHubSubmissions', null, {});
  },
};
