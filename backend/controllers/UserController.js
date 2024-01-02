import { User } from "../models/User.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import cloudinary from "cloudinary";

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return next(new ErrorHandler("Please Enter All Fields", 400));

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exists", 409));

    user = await User.create({
        name,
        email,
        password,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const options = {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none"
    };

    res.status(200).cookie("token", token, options).json({
        success: true,
        message: "You've Registered Successfully"
    })
});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new ErrorHandler("Please Enter All Fields", 400));

    const user = await User.findOne({ email, password });

    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const options = {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none"
    };

    res.status(200).cookie("token", token, options).json({
        success: true,
        message: `Logged In Successfully`,
    });
});

export const logout = catchAsyncError(async (req, res, next) => {
    const options = {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };
    res.status(200).cookie("token", null, options).json({
        success: true,
        message: "Logged Out Successfully"
    })
});

export const getUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne().select("-email -password");

    res.status(200).json({
        success: true,
        user,
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user,
    });
});

export const updateUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, skills, about } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;


    if (skills) {
        if (skills.image1) {

            await cloudinary.v2.uploader.destroy(user.skills.image1.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(skills.image1, { folder: "Portfolio" });

            user.skills.image1 = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        };
        if (skills.image2) {

            await cloudinary.v2.uploader.destroy(user.skills.image2.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(skills.image2, { folder: "Portfolio" });

            user.skills.image2 = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        };
        if (skills.image3) {

            await cloudinary.v2.uploader.destroy(user.skills.image3.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(skills.image3, { folder: "Portfolio" });

            user.skills.image3 = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        };
        if (skills.image4) {

            await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(skills.image4, { folder: "Portfolio" });

            user.skills.image4 = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        };
        if (skills.image5) {

            await cloudinary.v2.uploader.destroy(user.skills.image5.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(skills.image5, { folder: "Portfolio" });

            user.skills.image5 = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        };
        if (skills.image6) {

            await cloudinary.v2.uploader.destroy(user.skills.image6.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(skills.image6, { folder: "Portfolio" });

            user.skills.image6 = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        };

    };

    if (about) {
        if(about.name) user.about.name = about.name;
        if(about.title) user.about.title = about.title;
        if(about.subtitle) user.about.subtitle = about.subtitle;
        if(about.description) user.about.description = about.description;
        if(about.quote) user.about.quote = about.quote;
        if (about.avatar) {
            await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(about.avatar, { folder: "Portfolio" })
            user.about.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        };
    };

    await user.save();

    res.status(200).json({
        success: true,
        message: "User Updated Successfully"
    });
});



export const addTimeline = catchAsyncError(async (req, res, next) => {

    const { title, description, date } = req.body

    if (!title || !description || !date) return next(new ErrorHandler("Please Enter All Fields", 400));

    const user = await User.findById(req.user._id);

    user.timeline.unshift({
        title,
        description,
        date,
    });

    await user.save();

    res.status(200).json({
        success: true,
        message: "Added to Timeline"
    });

});

export const addYoutube = catchAsyncError(async (req, res, next) => {

    const { url, title, image } = req.body

    if (!url || !title || !image) return next(new ErrorHandler("Please Enter All Fields", 400));

    const user = await User.findById(req.user._id);

    const myCloud = await cloudinary.v2.uploader.upload(image, { folder: "Portfolio" });

    user.youtube.unshift({
        url,
        title,
        image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    });

    await user.save();

    res.status(200).json({
        success: true,
        message: "Added to Youtube",
    });

});

export const addProject = catchAsyncError(async (req, res, next) => {
    
    const { url, title, image, description, techStack } = req.body;

    if(!url || !title || !image || !description || !techStack) return next(new ErrorHandler("Please Enter All Fields", 400))

    const user = await User.findById(req.user._id);

    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio",
    });
    user.projects.unshift({
      url,
      title,
      description,
      techStack,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Projects",
    });

});



export const deleteTimeline = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    user.timeline = user.timeline.filter((item) => {
        if (item._id.toString() !== id.toString()) return item;
    });

    await user.save();

    res.status(200).json({
        success: true,
        message: "Deleted from Timeline"
    });
});

export const deleteYoutube = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    const video = user.youtube.find((item) => {
        if (item._id.toString() === id.toString()) return item;
    });

    await cloudinary.v2.uploader.destroy(video.image.public_id);

    user.youtube = user.youtube.filter((item) => {
        if (item._id.toString() !== id.toString()) return item;
    });

    await user.save();
    res.status(200).json({
        success: true,
        message: "Video Deleted From Youtube"
    });
});

export const deleteProject = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    const project = user.projects.find((item) => {
        if (item._id.toString() === id.toString()) return item;
    });

    await cloudinary.v2.uploader.destroy(project.image.public_id);

    user.projects = user.projects.filter((item) => {
        if (item._id.toString() !== id.toString()) return item;
    });

    await user.save();

    res.status(200).json({
        success: true,
        message: "Project Deleted Successfully"
    });
});


export const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler("User not found", 404));

    await user.deleteOne();
    
    res.status(200).json({
        success: true,
        message: `User Deleted Successfully `,
    });

});

export const contact = catchAsyncError(async (req, res, next) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) return next(new ErrorHandler("Please Enter All Fileds", 400));
    const to = process.env.MY_MAIL;
    const from = email;
    const subject = 'Contact from Portfolio';
    const text = `Hi, I am ${name} and my email is ${email} \nMessage: ${message}`;

    await sendEmail(to, from, subject, text);
    res.status(200).json({
        success: true,
        message: "Message Sent Successfully"
    });
});
