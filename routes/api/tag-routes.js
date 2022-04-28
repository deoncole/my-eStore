const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        attributes: ['product_name', 'price', 'stock']
      }
    ]
  })
  .then(dbProductTagData => res.json(dbProductTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        attributes: ['id','product_name', 'price', 'stock']
      }
    ]
  })
  .then(dbProductTagData => {
    if(!dbProductTagData){
      res.status(400).json({ message: 'No tag with that ID found'});
      return;
    }
    res.json(dbProductTagData);
  })
  .catch(err=> {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbProductTagData => res.json(dbProductTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbProductTagData => {
    if(!dbProductTagData){
      res.status(400).json({ message: 'No product found with that tag ID'});
      return;
    }
    res.json(dbProductTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then (dbProductTagData => {
    if(!dbProductTagData){
      res.status(400),json({ message: 'No product found with that ID'})
      return;
    }
    res.json(dbProductTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
