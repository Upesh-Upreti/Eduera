const { Subscription } = require("../../models");
const fs = require("fs")

const getSubscriptions = async (req, res) => {

    const subscription = await Subscription.findAll()

    if (subscription) return res.status(200).json(subscription)

    return res
        .status(404)
        .json({ message: "Sorry! we didn't find any enquiries ." })

}

const getSubscriptionById = async (req, res) => {

    const subscriptionId = req.params.id

    const subscription = await Subscription.findOne({ where: { id: subscriptionId } })

    if (subscription) return res.status(200).json(subscription)

    return res
        .status(404)
        .json({ message: "Sorry! we didn't find any enquiries ." })

}

const deleteSubscriptionById = async (req, res) => {

    const subscriptionId = req.params.id;

    const subscription = await Subscription.findOne({ where: { id: subscriptionId } });

    if (!subscription)
        return res.status(404).json({ "message": "Sorry! no such subscription found." })

    if (!subscription.imageUrl) {
        const path = "public/" + subscription.imageUrl.slice(process.env.BASE_URL.length, subscription.imageUrl.length)

        try {
            fs.unlinkSync(path);
            //file removed
        } catch (err) { console.log(err); }

    }

    const deleted = await Subscription.destroy({ where: { id: subscriptionId } });

    if (deleted) {
        res.status(202).json({ message: "Subscription was deleted successfully." });
    } else {
        res.status(404).json({
            message:
                "No such subscription was found or the subscription was already deleted",
        });
    }
};

module.exports = {
    getSubscriptions,
    getSubscriptionById,
    deleteSubscriptionById,
};
