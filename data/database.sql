SET NAMES 'utf8';
DROP DATABASE IF EXISTS BLmove;
CREATE DATABASE BLmove CHARSET=UTF8;
USE BLmove;
CREATE TABLE bl_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    price FLOAT(6,2),
    img VARCHAR(64),
    distance FLOAT(6,2),
    address VARCHAR(2048),

    img_bg VARCHAR(64),
    kftime VARCHAR(120),
    ryway VARCHAR(100),
    qpway VARCHAR(100),
    dp VARCHAR(100)
);
INSERT INTO bl_dish(did,name,price,img,distance,address,img_bg,kftime,ryway,qpway,dp) VALUES
(   null,
    '沈阳怪坡奇城(太岁馆)',
     20,
    '1.png',
    0,
    '辽宁 沈阳'

    ,'detail1.png'
    ,'5:30-16:30'
    ,'凭短信到景区售票处兑换'
    ,'景区售票处'
    ,''
),
(   null,
    '河南风国际旅行社',
     249,
    '2.png',
    0,
    '河南 郑州市'
    ,'detail2.png'
    ,'6:30-10:30'
    ,'凭微信二维码到景区售票处兑换'
    ,'紫荆山级和乘车'
    ,''
),
(   null,
    '索易攀岩馆门票',
     38,
    '3.png',
    60,
    '河南 郑州市'
    ,'detail1.png'
    ,'6:30-10:30'
    ,'凭微信二维码到景区售票处兑换'
    ,'紫荆山级和乘车'
    ,''
),
(   null,
    '禅宗少林音乐大典',
     198,
    '4.png',
    168,
    '河南 郑州市'
    ,'detail2.png'
    ,'7:15准时到场'
    ,'凭短信到景区售票处兑换纸票'
    ,'景区售票口'
    ,''
),
(   null,
    '珏山缆车',
     25,
    '6.png',
    30,
    '山西省 晋城市'
    ,'detail1.png'
        ,'6:30-10:30'
        ,'电子票'
        ,'缆车售票处'
        ,''
),
(   null,
    '黄围山',
     48,
    '7.png',
    60,
    '山西省 晋城市'
    ,'detail2.png'
        ,'早八晚五'
        ,'凭微信二维码到景区售票处兑换'
        ,'紫荆山级和乘车'
        ,''
),
(   null,
    '珏山',
     48,
    '8.png',
    60,
    '山西省 晋城市'
    ,'detail1.png'
        ,'早八晚六'
        ,'电子票短信票都可入园'
        ,'紫荆山级和乘车'
        ,''
),
(   null,
    '沈阳怪坡虎园',
     70,
    '9.png',
    80,
    '辽宁 沈阳'
    ,'detail2.png'
        ,'6:30-10:30'
        ,'凭微信二维码到景区售票处兑换'
        ,'紫荆山级和乘车'
        ,''
);


CREATE TABLE bl_user(
    userid INT PRIMARY KEY AUTO_INCREMENT,
    pwd VARCHAR(20),
    phone VARCHAR(20)
);
INSERT INTO bl_user VALUES
(NULL,'1','1380000001'),
(NULL,'2','1380000002'),
(NULL,'3','1380000003'),
(NULL,'4','1380000004'),
(NULL,'5','1380000005'),
(NULL,'6','1380000006'),
(NULL,'7','1380000007'),
(NULL,'8','1380000008'),
(NULL,'1','1');

CREATE TABLE bl_cart(
    ctid INT PRIMARY KEY AUTO_INCREMENT, /*购物车编号*/
    userid INT,                          /*用户编号：假定有用户id为 1 和 3 的两个用户有数据*/
    did INT,                             /*产品编号*/
    dishCount INT                      /*数量*/
);
INSERT INTO bl_cart VALUES (1,1,1,1),
(2,1,2,4),
(3,1,5,2),
(4,3,2,4),
(5,3,6,1),(6,9,2,3),(7,9,1,1);
--/*订单表*/
--CREATE TABLE kf_order(
--    oid INT PRIMARY KEY AUTO_INCREMENT,     /*订单ID*/
--    userid INT,                             /*用户*/
--    phone VARCHAR(16),                      /*联系电话*/
--    user_name VARCHAR(16),                  /*收货方用户名*/
--    order_time LONG,                        /*下单时间*/
--    addr VARCHAR(256),                      /*订单地址*/
--    totalprice FLOAT(6,2)                   /*订单总价*/
--);
--INSERT INTO kf_order VALUES
--(NULL,1,'13501234567','大旭',1445154859209,'大钟寺中鼎B座',20.5),
--(NULL,1,'13501257543','琳妹妹',1445154997543,'大钟寺中鼎B座',12.5),
--(NULL,2,'13207654321','东东',1445254997612,'大钟寺中鼎B座',55),
--(NULL,2,'13899999999','文兄',1445354959209,'大钟寺中鼎B座',35),
--(NULL,3,'13683675299','梅姐',1445355889209,'大钟寺中鼎B座',45);
--/**购物车表**/
--CREATE TABLE kf_cart(
--    ctid INT PRIMARY KEY AUTO_INCREMENT, /*购物车编号*/
--    userid INT,                          /*用户编号：假定有用户id为 1 和 3 的两个用户有数据*/
--    did INT,                             /*产品编号*/
--    dishCount INT                      /*数量*/
--);
--INSERT INTO kf_cart VALUES (1,1,1,1),
--(2,1,2,4),
--(3,1,5,2),
--(4,3,2,10),
--(5,3,6,1);
--##SELECT * FROM kf_order;
--/**订单详情表**/
--CREATE TABLE kf_orderdetails(
--    oid INT ,                            /*订单编号*/
--    did INT,                             /*产品id*/
--    dishCount INT,                     /*购买数量*/
--    price FLOAT(8,2)                     /*产品单价：需要记载，因为产品价格可能波动*/
--);
--INSERT INTO kf_orderdetails VALUES (1,1,2,5),
--(1,2,1,10.5),
--(2,3,1,12.5),
--(3,1,3,5),
--(3,2,4,10),
--(4,4,7,5),
--(5,5,5,4),
--(5,6,2,12.5);
