import dotenv from "dotenv";
// import axios from "axios";
import joi from "joi";
import Product from "../models/product";

dotenv.config();

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    desc: joi.string()
});

export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            });
        }
        return res.json({
            message: "Lấy danh sách sản phẩm thành công",
            products,
        });
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}
export const getOne = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        if (!products) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            });
        }
        return res.json({
            message: "Lấy sản phẩm thành công",
            products,
        });
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}
export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req, body);
        if (error) {
            return res.status(error.message).json({
                message: ("Không thể thêm sản phẩm")
            });
        }
        const product = await Product.create(req.body);
        if (!product) {
            return res.status(404).json({
                message: "Thêm sản phẩm không thành công"
            })
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export const update = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        })
        if (!product) {
            return res.status(404).json({
                message: "Không thể cập nhật sản phẩm"
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}
