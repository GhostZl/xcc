// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: {},
        requestUrl: "",
        totalCount: 0,
        isEmpty: true,
        hasMore: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var title = options.category;
        var dataUrl = "";
        wx.setNavigationBarTitle({
            title: title
        });
        switch (title) {
            case "正在热映":
                dataUrl = app.globalData.doubanBase +
                    "/v2/movie/in_theaters";
                break;
            case "即将上映":
                dataUrl = app.globalData.doubanBase +
                    "/v2/movie/coming_soon";
                break;
            case "豆瓣Top250":
                dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
                break;
        }
        // dataUrl += '?count=18';
        this.setData({ requestUrl: dataUrl });
        dataUrl += '?count=18';
        util.http(dataUrl, this.processDoubanData);
    },
    onPullDownRefresh: function (event) {
        var refreshUrl = this.data.requestUrl +
            "?star=0&count=20";
        this.data.movies = {};
        this.data.isEmpty = true;
        this.data.hasMore = true;
        this.data.totalCount = 0;
        util.http(refreshUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },
    processDoubanData: function (moviesDouban) {
        var movies = [];
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            // [1,1,1,1,1] [1,1,1,0,0]
            var temp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp);
        }
        var totalMovies = {}

        //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
        if (!this.data.isEmpty) {
            totalMovies = this.data.movies.concat(movies);
        }
        else {
            totalMovies = movies;
            this.data.isEmpty = false;
        }
        this.setData({
            movies: totalMovies
        });
        this.data.totalCount += 18;
        if (this.data.totalCount >= moviesDouban.total) {
            this.data.hasMore = false;
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
    },
    onReachBottom: function (event) {
        if (!this.data.hasMore) {
            wx.showToast({
                title: '没有更多啦！',
                icon: 'none',
                duration: 2000
            })
            return false;
        }
        var nextUrl = this.data.requestUrl +
            "?start=" + this.data.totalCount + "&count=18";
        util.http(nextUrl, this.processDoubanData)
        wx.showNavigationBarLoading()
    },
    onMovieTap: function (event) {
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + movieId
        })
    },
})