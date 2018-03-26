// pages/posts/post.js
var postData = require('../../data/post-data.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },

    goPostDetail: function (event) {
        var postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(1);
        this.setData({ list: postData.postList });
        // this.data.list = postData.posList;
    },
    onSwiperTap: function (event) {
        // target 和currentTarget
        // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
        // target这里指的是image，而currentTarget指的是swiper
        console.log(event);
        var postId = event.target.dataset.postid;
        wx.navigateTo({
            url: "post-detail/post-detail?id=" + postId
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log(2);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log(3);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log(4);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log(5);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log(6);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log(7);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        console.log(8);
    }
})