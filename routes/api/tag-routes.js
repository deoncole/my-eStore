const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  ProductTag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id','product_name', 'price', 'stock']
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
  ProductTag.findOne({
    where: {
      req: req.params.id
    },
    include: [
      {
        model: Product,
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
  ProductTag.create({
    product_id: req.body.product_id,
    tag_id: req.body.tag_id
  })
  .then(dbProductTagData => res.json(dbProductTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  ProductTag.update(
    {
      tag_id: req.body.id
    },
    {
      where: {
        id: req.body.id
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
  ProductTag.destroy({
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
