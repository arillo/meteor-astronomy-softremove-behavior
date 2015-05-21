# Meteor Astronomy softremove behavior

## About
This behavior adds to fields to the schema `removed` and `removedAt`. `removed` will be a boolean marked true and `removedAt` will be filled with the current date on document remove. If you want to softremove an element just call softRemove() instead of remove()

## Usage

```js
var post = new Post();
post.softRemove();
console.log(post.removed); // Prints out true if removed
console.log(post.removedAt); // Prints out date of document removable
```

You can also pass options for the removed and removedAt fields

```js
Post = Astronomy.Class({
  name: 'Post',
  collection: Posts,
  fields: ['title'],
  behaviors: {
    'softremove': {
      removedFieldName: 'deleted',
      removedAtFieldName: 'deletedAt'
    }
  }
});
```

## Events

You will get two events, one before ```beforesoftremove```  and one after ```aftersoftremove``` the object has been softremoved.

**Notice:** currently you have to take care yourself of removing the softRemoved objects from your publish functions. You can do this by filtering via removed: false, like:

```js
Meteor.publish( 'posts',  function() {
    Posts.find({},{removed: false});
}
```

**TODO:**
- Implement retrieval of query selector to omit removed items