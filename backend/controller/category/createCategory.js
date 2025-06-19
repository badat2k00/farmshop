const categoryModel=require('../../models/categoryModel')
async function createCategory(req,res){
try {
    const {categoryName} = req.body;
     const payload={...req.body,status:true}
    const existingCategory = await categoryModel.findOne({ categoryName });

    if (existingCategory) {
        return res.json({
            message: "Category already exists",
            error: true,
            success: false
        });
    }

    const newCategory= new categoryModel(payload);
    const saveCategory = await newCategory.save();
   
    res.json({
        message: "Create Category Successfully",
        data: saveCategory,
        error: false,
        success: true
    });

} catch (error) {
    res.json({
        message: error?.message || e,
        error: true,
        success: false,
    });
}

}
module.exports=createCategory