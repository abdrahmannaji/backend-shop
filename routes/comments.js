const express = require('express')
const {
  getCommentByVideoId,
  getCommentcountByVideoId,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/comments')

const router = express.Router()

// const advancedResults = require('../middleware/advancedResults')
const { protect } = require('../middleware/auth')

router
  .route('/')
  // .get(advancedResults(Category), getCategories)
  .post(protect, createComment)

router.route('/:id').put(protect, updateComment).delete(protect, deleteComment)

router.route('/:videoId/videos').get(getCommentByVideoId)
router.route('/:videoId/count').get(getCommentcountByVideoId)

module.exports = router
