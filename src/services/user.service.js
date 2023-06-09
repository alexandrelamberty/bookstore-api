const { UserDTO } = require("../dto/user.dto");
const db = require("../models");

const userService = {
  getAll: async (offset, limit) => {
    const { rows, count } = await db.User.findAndCountAll({
      distinct: true,
      offset,
      limit,
      include: [
        {
          model: db.Order,
          include: [
            {
              model: db.MM_Order_Book,
              include: [db.Book],
            },
          ],
        },
      ],
    });
    return {
      users: rows.map((user) => new UserDTO(user)),
      count,
    };
  },

  getById: async (id) => {
    const user = await db.User.findByPk(id);
    return user ? new UserDTO(user) : null;
  },

  update: async (userToUpdate, id) => {
    const updatedRow = await db.User.update(userToUpdate, {
      where: { id },
    });
    return updatedRow[0] === 1;
  },

  delete: async (id) => {
    const nbDeletedRow = await db.User.destroy({
      where: { id },
    });
    return nbDeletedRow === 1;
  },

  // updateAvatar: async (id, filename) => {
  //   const data = {
  //     avatar: `/images/avatars/${filename}`,
  //   };
  //   const updatedRow = await db.User.update(data, {
  //     where: { id },
  //   });
  //   return updatedRow[0] === 1;
  // },
};

module.exports = userService;
