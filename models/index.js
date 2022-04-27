// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// set up the association to say the at the Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Set up the associations to say that the Categories relationship is to have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// set up the association to say that the Products belongToMany Tags (through ProductTag)
Product.belongsToMany(ProductTag, {
  through: ProductTag,
  as: 'product_tags',
  foreignKey: 'product_id'
})
// set up the association to day that the Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'tags',
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
