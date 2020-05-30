// import firebase from 'react-native-firebase';

// const Firebase = {
//     uploadPost: post => {
//         const id = uuid.v4()
//         const uploadData = {
//             id: id,
//             postPhoto: post.photo,
//             postTitle: post.title
//         }
//         return firebase
//                 .firestore()
//                 .collection('posts')
//                 .doc(id)
//                 .set(uploadData)
//     },

//     getPosts: () => {
//         return firebase
//           .firestore()
//           .collection('posts')
//           .get()
//           .then(function(querySnapshot) {
//             let posts = querySnapshot.docs.map(doc => doc.data())
//             // console.log(posts)
//             return posts
//           })
//           .catch(function(error) {
//             console.log('Error getting documents: ', error)
//           })
//     }
// }
  
// export default Firebase;