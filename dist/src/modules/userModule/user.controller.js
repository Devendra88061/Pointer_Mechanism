"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = require("../../schema/user");
class userController {
    // Add user
    static addUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, age, hobbies } = request.body;
            try {
                const existingUser = yield user_1.default.findOne({ userName });
                if (existingUser) {
                    return response.status(400).json({
                        message: "User already exists",
                        status: "failure"
                    });
                }
                else {
                    if (!request.body.age || !request.body.hobbies) {
                        return response.status(400).send({
                            message: "Required fields are missing",
                            status: "failure"
                        });
                    }
                    const newUser = new user_1.default({
                        userName, age, hobbies
                    });
                    const result = yield newUser.save();
                    response.status(201).json({
                        message: "User created successfully!",
                        data: result,
                        status: "success"
                    });
                }
            }
            catch (error) {
                response.status(500).json({
                    message: "Internal server error"
                });
            }
        });
    }
    ;
    // Get all Users
    static getAllUsers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersCount = yield user_1.default.countDocuments();
            const usersData = yield user_1.default.find();
            if (usersData) {
                response.status(200).json({
                    message: "All users received successfully!",
                    count: usersCount,
                    data: usersData,
                    status: "success"
                });
            }
            else {
                response.status(404).json({
                    message: "No Books Found!",
                    status: "failure"
                });
            }
        });
    }
    ;
    // get single user
    static getSingleUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = request.params.id;
            if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
                response.status(400).json({
                    message: "Invalid user ID ",
                    status: "failure"
                });
            }
            else {
                const userData = yield user_1.default.findById({ _id: userId });
                if (!userData) {
                    return response.status(404).json({
                        message: "This user is not available",
                        status: "failure"
                    });
                }
                else {
                    return response.status(200).json({
                        message: "User data received successfully!",
                        data: userData,
                        status: "success"
                    });
                }
            }
        });
    }
    ;
    // update user
    static updateUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.params.id;
                console.log("user id---", userId);
                const userData = yield user_1.default.findById({ _id: userId });
                if (!userData) {
                    response.status(400).json({
                        message: "User not found",
                        status: "failure"
                    });
                }
                else {
                    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
                        response.status(400).json({
                            message: "Invalid user ID ",
                            status: "failure"
                        });
                    }
                    else {
                        const updatedUserData = request.body;
                        const updatedUser = yield user_1.default.findByIdAndUpdate(userId, updatedUserData, { new: true });
                        return response.status(200).json({
                            message: 'User updated successfully',
                            data: updatedUser,
                            status: 'success'
                        });
                    }
                }
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    // delete user
    static deleteUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = request.params.id;
                console.log("user id---", userId);
                if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
                    response.status(400).json({
                        message: "Invalid user ID ",
                        status: "failure"
                    });
                }
                else {
                    const userData = yield user_1.default.findById({ _id: userId });
                    if (!userData) {
                        response.status(404).json({
                            message: 'user not found',
                            status: "failure"
                        });
                    }
                    else {
                        yield user_1.default.findByIdAndDelete({ _id: userId });
                        response.status(204).json({
                            message: 'User delete successfully',
                            status: 'success'
                        });
                    }
                }
            }
            catch (error) {
                console.error(error);
                response.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.default = userController;
