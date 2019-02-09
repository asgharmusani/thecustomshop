 INSERT INTO `product_category` (`id`, `category`) VALUES
	(1, 'suits'),
	(2, 'formal'),
	(3, 'accessories');

INSERT INTO `product_fabric` (`id`, `text`, `url`) VALUES
	(1, 'portal_ireland', NULL),
	(2, 'adaptive_china', NULL),
	(3, 'advanced_czech', NULL),
	(4, 'black_italian', NULL),
	(5, 'blandit_spain', NULL),
	(6, 'check_rome', NULL),
	(7, 'cloned_peru', NULL),
	(8, 'complexity_russia', NULL),
	(9, 'concept_china', NULL),
	(10, 'diverse_latvia', NULL),
	(11, 'ergonomic_argentina', NULL),
	(12, 'global_china', NULL),
	(13, 'interface_belarus', NULL),
	(14, 'ipsum_italian ', NULL),
	(15, 'label_peru', NULL),
	(16, 'networked_serbia', NULL),
	(17, 'nylon_spain', NULL),
	(18, 'product_indonesia', NULL),
	(19, 'red_italian', NULL),
	(20, 'sodales_rome ', NULL),
	(21, 'synergy_france', NULL),
	(22, 'mold_france', NULL),
	(23, 'check_spain', NULL),
	(24, 'heart_italy', NULL);
	
INSERT INTO `product` (`isFeatured`,`title`, `description`, `fabric_id`, `category_id`, `createdAt`,`updatedAt`) VALUES
	(1,"V.B.C. Grey Elegant Checked Two Piece Suit","The V.B.C. Grey Elegant Checked Two-Piece Suit is made of Original fabric from Vitale Barberis Canonico,Italy.Doesn't need any of the fancy decoration,A high-grade gray is enough to completely release the charm of yours.", 1,  1,'2018-09-27 07:57:36', '2018-09-28 07:57:36'),
	(1,"V.B.C. Grey Wide Stripe Two Piece Suit","The V.B.C. Grey Wide Stripe Two-Piece Suit is made of Original fabric from Vitale Barberis Canonico,Italy.Stripes are an indispensable classic element, and the distinct lines give the suit a bold and firm texture.Wanna be both fashion and formal?This is your first choice!", 2,  2,'2018-09-27 07:58:30', '2018-09-28 07:58:30'),
	(default,"V.B.C. Black Light and Dark Red Checked Two Piece Suit","The V.B.C. Black Light and Dark Red Checked Two-Piece Suit is made of Original fabric from Vitale Barberis Canonico,Italy.Suitable for daily dinners, semi-formal meetings, high-profile family celebrations, etc., semi-formal occasions dress standards, a wider range of coverage, the same applies to daily wearing.", 3,  1,'2018-09-27 07:59:31', '2018-09-28 07:59:31'),
	(default,"V.B.C. Light Grey Stripe Two Piece Suit","The V.B.C. Light Grey Stripe Two-Piece Suit is made of Original fabric from Vitale Barberis Canonico,Italy.Stripes are an indispensable classic element, and the distinct lines give the suit a bold and firm texture.", 4,  2,'2018-09-27 07:59:37', '2018-09-28 07:59:37'),
	(default,"V.B.C. Blue Grey Light and Dark Checked Two Piece Suit","The V.B.C. Blue Grey Light and Dark Checked Two-Piece Suit is made of Original fabric from Vitale Barberis Canonico,Italy. The suit is the armor of a modern gentleman. Let Gentleman's style and temperature coexist, this is your fist choice for Fall and Winter.", 5,  1,'2018-09-27 08:07:53', '2018-09-28 08:07:53'),
	(1,"V.B.C. Navy Plain Two Piece Suit","The V.B.C. Navy Plain Two-Piece Suit is made of Original fabric from Vitale Barberis Canonico,Italy.Wearing this maintains a formal and calm attitude without being too rigid.", 6,  1,'2018-09-27 08:08:11', '2018-09-28 08:08:11'),
	(1,"V.B.C. Grey Checked Two Piece Suit","The V.B.C. Grey Checked Two-Piece Suit is made of Original fabric from Vitale Barberis Canonico,Italy.Retro style, reinterpreted from a fashionistal perspective, warm and advanced.", 7,  3,'2018-09-27 08:08:18', '2018-09-28 08:08:18'),
	(1,"V.B.C. Navy Strip Two Piece Suit","The V.B.C. Navy Strip Two-Piece Suit is made of Original fabric from Vitale Barberis Canonico,Italy.Simple and distinctive, it is perfect for formal and business occasions.", 8,  1,'2018-09-27 08:08:36', '2018-09-28 08:08:36'),
	(1,"V.B.C. Light Blue Strip Two Piece Suit","The V.B.C. Light Blue Strip Two-Piece Suit is made of Original fabric from Vitale Barberis Canonico,Italy.Calm and elegant, quiet and restrained, white shirt with a light blue suit, stylish and energetic.", 9,  2,'2018-09-27 08:08:44', '2018-09-28 08:08:44'),
	(1,"V.B.C. Light Grey Strip Two Piece Suit","The V.B.C. Light Grey Strip Two-Piece Suit is made of Original fabric from Vitale Barberis Canonico,Italy.A light gray striped suit with a white shirt, exquisite look exudes a high-quality texture.", 10, 2,  '2018-09-28 08:08:57', '2018-09-28 08:08:57'),
	(1,"Formal Dark Navy Reda Two Piece Suit","This dark navy suit made from 90% wool and 10% cashmere with feels comfortable and adds a bit of warmth. It goes perfectly with a black shirt and a black and red striped tie for a understate and elegant look.", 11, 3,  '2018-09-28 08:09:48', '2018-09-28 08:09:48'),
	(default,"Business Charcoal Grey Reda Two Piece Suit","This is two-piece business suit is made from 100% wool giving it a breath ability that makes it a good choice any time of year. It uses Super 120s fabric which gives it an elegant appearance and when matched with a fitted T-shirt, it works great as a suit for less formal occasions.", 12, 1,  '2018-09-28 08:09:57', '2018-09-28 08:09:57'),
	(default,"Grey Business Two Piece Suit","This black suit is simple, classic, and appropriate for all occasions. Match it with black or white solid shirt and a black or dark red tie for a more striking look. Upgrade to a three-piece with this suit's matching vest.", 13, 3,  '2018-09-28 08:10:07', '2018-09-28 08:10:07'),
	(default,"Light Grey Fashion Two Piece Suit","Made from 100% wool, the Super 160s fabric is of the highest quality and give the texture and appearance that you would expect from a luxury suit. For business occasions, pair it with a white shirt and grey tie.", 14, 1,  '2018-09-28 08:10:13', '2018-09-28 08:10:13'),
	(1,"Deep Grey Fashion Two Piece Suit","Made from Super 130s Merino wool blended with cashmere with perfect workmanship and the highest quality. It pairs great with the solid color business dress shirts or even a bright colored T-shirt for a more relaxed and modern style.", 15, 2,  '2018-09-28 08:10:24', '2018-09-28 08:10:24'),
	(1,"Fashion Grey Two Piece Suit","This dark navy suit made from 90% wool and 10% cashmere with feels comfortable and adds a bit of warmth. It goes perfectly with a black shirt and a black and red striped tie for a understate and elegant look.", 16, 3,  '2018-09-28 08:11:12', '2018-09-28 08:11:12'),
	(1,"Business Grey Two Piece Suit","Made from Super 130s Merino wool blended with cashmere with perfect workmanship and the highest quality. It pairs great with the solid color business dress shirts or even a bright colored T-shirt for a more relaxed and modern style.", 17, 2,  '2018-09-28 08:11:28', '2018-09-28 08:11:28'),
	(1,"Business Navy Blue Two Piece Suit","This is two-piece business suit is made from 100% wool giving it a breath ability that makes it a good choice any time of year. It uses Super 120s fabric which gives it an elegant appearance and when matched with a fitted T-shirt, it works great as a suit for less formal occasions.", 18, 3,  '2018-09-28 08:11:37', '2018-09-28 08:11:37'),
	(default,"Business Blue Two Piece Suit","This is two-piece business suit is made from 100% wool giving it a breath ability that makes it a good choice any time of year. It uses Super 120s fabric which gives it an elegant appearance and when matched with a fitted T-shirt, it works great as a suit for less formal occasions.", 19, 1,  '2018-09-28 08:11:42', '2018-09-28 08:11:42'),
	(default,"Blue Business Suit","This is two-piece business suit is made from 100% wool giving it a breath ability that makes it a good choice any time of year. It uses Super 120s fabric which gives it an elegant appearance and when matched with a fitted T-shirt, it works great as a suit for less formal occasions.", 20, 2,  '2018-09-28 08:11:45', '2018-09-28 08:11:45'),
	(default,"Business Blue and Black Checked Suit","Made from Super 130s Merino wool blended with cashmere with perfect workmanship and the highest quality. It pairs great with the solid color business dress shirts or even a bright colored T-shirt for a more relaxed and modern style.", 21, 2,  '2018-09-28 08:11:49', '2018-09-28 08:11:49'),
	(1,"Dark Blue and Red Plaid Suit","This black suit is simple, classic, and appropriate for all occasions. Match it with black or white solid shirt and a black or dark red tie for a more striking look. Upgrade to a three-piece with this suit's matching vest.", 22, 3,  '2018-09-28 08:11:51', '2018-09-28 08:11:51'),
	(1,"Ink Blue Plaid Two Piece Suit","This black suit is simple, classic, and appropriate for all occasions. Match it with black or white solid shirt and a black or dark red tie for a more striking look. Upgrade to a three-piece with this suit's matching vest.", 23, 3,  '2018-09-28 08:11:54', '2018-09-28 08:11:54'),
    (1,"Charcoal Black Two Piece Suit ","Made from 100% wool, the Super 160s fabric is of the highest quality. This black suit is simple, classic, and appropriate for all occasions. It pairs great with the solid color business dress shirts.", 24, 2,  '2018-09-28 08:12:54', '2018-09-28 08:12:54');
    
INSERT INTO `product_price` (`id`, `product_id`, `price`, `discounted_price`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 41000, NULL, '2018-09-27 07:57:36', '2018-09-28 07:57:36'),
	(1, 2, 41000, NULL, '2018-09-27 07:58:30', '2018-09-28 07:58:30'),
	(1, 3, 25000, NULL, '2018-09-27 07:59:31', '2018-09-28 07:59:31'),
	(1, 4, 40000, NULL, '2018-09-27 07:59:37', '2018-09-28 07:59:37'),
	(1, 5, 25000, NULL, '2018-09-27 08:07:53', '2018-09-28 08:07:53'),
	(1, 6, 35000, NULL, '2018-09-27 08:08:11', '2018-09-28 08:08:11'),
	(1, 7, 21000, NULL, '2018-09-27 08:08:18', '2018-09-28 08:08:18'),
	(1, 8, 35000, NULL, '2018-09-27 08:08:36', '2018-09-28 08:08:36'),
	(1, 9, 35000, NULL, '2018-09-27 08:08:44', '2018-09-28 08:08:44'),
	(1, 10, 41000, NULL, '2018-09-28 08:08:57', '2018-09-28 08:08:57'),
	(1, 11, 31000, NULL, '2018-09-28 08:09:48', '2018-09-28 08:09:48'),
	(1, 12, 41000, NULL, '2018-09-28 08:09:57', '2018-09-28 08:09:57'),
	(1, 13, 35000, NULL, '2018-09-28 08:10:07', '2018-09-28 08:10:07'),
	(1, 14, 35000, NULL, '2018-09-28 08:10:13', '2018-09-28 08:10:13'),
	(1, 15, 40000, NULL, '2018-09-28 08:10:24', '2018-09-28 08:10:24'),
	(1, 16, 36000, NULL, '2018-09-28 08:11:12', '2018-09-28 08:11:12'),
	(1, 17, 38000, NULL, '2018-09-28 08:11:28', '2018-09-28 08:11:28'),
	(1, 18, 40000, NULL, '2018-09-28 08:11:37', '2018-09-28 08:11:37'),
	(1, 19, 30000, NULL, '2018-09-28 08:11:42', '2018-09-28 08:11:42'),
	(1, 20, 30000, NULL, '2018-09-28 08:11:45', '2018-09-28 08:11:45'),
	(1, 21, 20000, NULL, '2018-09-28 08:11:49', '2018-09-28 08:11:49'),
	(1, 22, 25000, NULL, '2018-09-28 08:11:51', '2018-09-28 08:11:51'),
	(1, 23, 23000, NULL, '2018-09-28 08:11:54', '2018-09-28 08:11:54'),
	(1, 24, 33000, NULL, '2018-09-28 08:12:54', '2018-09-28 08:12:54');
	

INSERT INTO `product_image` (`id`, `product_id`, `createdAt`, `updatedAt`) VALUES
	(1, 1, '2018-09-27 07:57:36', '2018-09-28 07:57:36'),
	(1, 2, '2018-09-27 07:58:30', '2018-09-28 07:58:30'),
	(1, 3, '2018-09-27 07:59:31', '2018-09-28 07:59:31'),
	(1, 4, '2018-09-27 07:59:37', '2018-09-28 07:59:37'),
	(1, 5, '2018-09-27 08:07:53', '2018-09-28 08:07:53'),
	(1, 6, '2018-09-27 08:08:11', '2018-09-28 08:08:11'),
	(1, 7, '2018-09-27 08:08:18', '2018-09-28 08:08:18'),
	(1, 8, '2018-09-27 08:08:36', '2018-09-28 08:08:36'),
	(1, 9, '2018-09-27 08:08:44', '2018-09-28 08:08:44'),
	(1, 10,  '2018-09-28 08:08:57', '2018-09-28 08:08:57'),
	(1, 11,  '2018-09-28 08:09:48', '2018-09-28 08:09:48'),
	(1, 12,  '2018-09-28 08:09:57', '2018-09-28 08:09:57'),
	(1, 13,  '2018-09-28 08:10:07', '2018-09-28 08:10:07'),
	(1, 14,  '2018-09-28 08:10:13', '2018-09-28 08:10:13'),
	(1, 15,  '2018-09-28 08:10:24', '2018-09-28 08:10:24'),
	(1, 16,  '2018-09-28 08:11:12', '2018-09-28 08:11:12'),
	(1, 17,  '2018-09-28 08:11:28', '2018-09-28 08:11:28'),
	(1, 18,  '2018-09-28 08:11:37', '2018-09-28 08:11:37'),
	(1, 19,  '2018-09-28 08:11:42', '2018-09-28 08:11:42'),
	(1, 20,  '2018-09-28 08:11:45', '2018-09-28 08:11:45'),
	(1, 21,  '2018-09-28 08:11:49', '2018-09-28 08:11:49'),
	(1, 22,  '2018-09-28 08:11:51', '2018-09-28 08:11:51'),
	(1, 23,  '2018-09-28 08:11:54', '2018-09-28 08:11:54'),
	(1, 24,  '2018-09-28 08:12:54', '2018-09-28 08:12:54');
	
INSERT INTO `tag` (tag) VALUES 
	('two-piece'),
	('three-piece'),
	('blazers'),
	('coats'),
	('waistcoats'),
	('shirts'),
	('pants'),
	('ties'),
	('cuffs'),
	('handkercheifs'),
	('buttons'),
	('blue'),
	('grey');
	
INSERT INTO `product_tag` VALUES 
	(1,1),
	(2,3),
	(1,5),
	(2,6),
	(2,8),
	(1,12),
	(1,14),
	(2,19),
	(6,15),
	(6,17),
	(6,20),
	(6,21),
	(6,24),
	(7,2),
	(7,4),
	(7,9),
	(7,10);
	
INSERT INTO `fabric_tag` (`tag_id`, `fabric_id`) VALUES
	(6, 1),
	(6, 5),
	(7, 5),
	(6, 6),
	(6, 8),
	(7, 12),
	(7, 14),
	(6, 19);