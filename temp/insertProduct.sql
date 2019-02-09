INSERT INTO Product (title, description, haveStock, current_stock, isActive, isFeatured, category_id, createdAt, updatedAt) VALUES ('Golden flower shaped', 'Cufflings for men.', '1', '10', '1', '1', '3', Now(), Now());
SET @id =  31;
INSERT INTO product_image (`id`, `product_id`, createdAt, updatedAt) VALUES ('1', @id, Now(), Now());
INSERT INTO product_price (`id`, `product_id`, `price`, `createdAt`, `updatedAt`) VALUES ('1', @id, '5000', Now(), Now());
INSERT INTO product_stock (`id`, `product_id`, `stock`, `createdAt`, `updatedAt`) VALUES ('1', @id, '10', Now(), Now());
INSERT INTO product_tag (tag_id, product_id) VALUES ('9', @id);