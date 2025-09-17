import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";
import Category from "../models/Categories.js";


// @desc    Get categories
// @route   GET /api/v1/categories
// @access  Private/Admin
export const getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single category
// @route   GET /api/v1/categories/:id
// @access  Private/Admin
export const getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    return next(
      new ErrorResponse(`No category with that id of ${req.params.id}`)
    )
  }

  res.status(200).json({ sucess: true, data: category })
})

// @desc    Create Category
// @route   POST /api/v1/categories/
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create({
    ...req.body,
    userId: req.user.id
  })

  return res.status(200).json({ sucess: true, data: category })
})

// @desc    Update category
// @route   PUT /api/v1/categories
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query'
  })

  if (!category)
    return next(
      new ErrorResponse(`No category with that id of ${req.params.id}`)
    )

  res.status(200).json({ success: true, data: category })
})

// @desc    Delete Category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  // ✅ FIX: Added authorization check to ensure only the category creator can delete it.
  if (category.userId.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(
        `User not authorized to delete this category`,
        401
      )
    );
  }

  await Category.findByIdAndDelete(req.params.id);

  return res.status(200).json({ success: true, category });
});

