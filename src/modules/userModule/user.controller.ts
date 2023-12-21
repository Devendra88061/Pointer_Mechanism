import mongoose from "mongoose";
import user from "../../schema/user";



class userController {

    // Add user
    public static async addUser(request: any, response: any) {
        const { userName, age, hobbies } = request.body;
        try {
            const existingUser = await user.findOne({ userName });
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
                const newUser = new user({
                    userName, age, hobbies
                });
                const result = await newUser.save();
                response.status(201).json({
                    message: "User created successfully!",
                    data: result,
                    status: "success"
                });
            }
        } catch (error) {
            response.status(500).json({
                message: "Internal server error"
            });
        }
    };

    // Get all Users
    public static async getAllUsers(request: any, response: any) {
        const usersCount = await user.countDocuments();
        const usersData = await user.find();
        if (usersData) {
            response.status(200).json({
                message: "All users received successfully!",
                count: usersCount,
                data: usersData,
                status: "success"
            })
        }
        else {
            response.status(404).json({
                message: "No Books Found!",
                status: "failure"
            })
        }
    };

    // get single user
    public static async getSingleUser(request: any, response: any) {
        const userId = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            response.status(400).json({
                message: "Invalid user ID ",
                status: "failure"
            });
        } else {
            const userData = await user.findById({ _id: userId });
            if (!userData) {
                return response.status(404).json({
                    message: "This user is not available",
                    status: "failure"
                });
            } else {
                return response.status(200).json({
                    message: "User data received successfully!",
                    data: userData,
                    status: "success"
                });
            }
        }
    };

    // update user
    public static async updateUser(request: any, response: any) {
        try {
            const userId = request.params.id;
            console.log("user id---", userId);
            const userData = await user.findById({ _id: userId });
            if (!userData) {
                response.status(400).json({
                    message: "User not found",
                    status: "failure"
                });
            } else {
                if (!mongoose.Types.ObjectId.isValid(userId)) {
                    response.status(400).json({
                        message: "Invalid user ID ",
                        status: "failure"
                    });
                } else {
                    const updatedUserData = request.body;
                    const updatedUser = await user.findByIdAndUpdate(userId, updatedUserData, { new: true });
                    return response.status(200).json({
                        message: 'User updated successfully',
                        data: updatedUser,
                        status: 'success'
                    });
                }
            }
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // delete user
    public static async deleteUser(request: any, response: any) {
        try {
            const userId = request.params.id;
            console.log("user id---", userId);
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                response.status(400).json({
                    message: "Invalid user ID ",
                    status: "failure"
                });
            } else {
                const userData = await user.findById({ _id: userId });
                if (!userData) {
                    response.status(404).json({
                        message: 'user not found',
                        status: "failure"
                    });
                } else {
                    await user.findByIdAndDelete({ _id: userId });
                    response.status(204).json({
                        message: 'User delete successfully',
                        status: 'success'
                    });
                }
            }
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
export default userController;