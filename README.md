This behavior adds to fields to the schema `removed` and `removedAt`. `removed` will be a boolean marked true and `removedAt` will be filled with the current date on document remove.

```js
var post = new Post();
post.remove();
console.log(post.removed); // Prints out true if removed
console.log(post.removedAt); // Prints out date of document removable
```

TODO: 
- Implement retrieval of query selector to ommit removed items