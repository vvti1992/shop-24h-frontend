const LIST_PRODUCE_JSON = `[
    {
        "name": "Galaxy S20 FE (8GB/256GB)",
        "type": "SamSung",
        "URLImage": "https://cdn.tgdd.vn/Products/Images/42/224859/samsung-galaxy-s20-fan-edition-xanh-la-1-org.jpg",
        "price": "15.490.000",
        "discountPrice": "15.190.000",
        "discription": "Đây là mẫu flagship cao cấp quy tụ nhiều tính năng mà Samfan yêu thích, hứa hẹn sẽ mang lại trải nghiệm cao cấp của dòng Galaxy S với mức giá dễ tiếp cận hơn.",
        "createTime": "05/2021"
    },
    {
        "name": "iPhone 11 64GB",
        "type": "Apple",
        "URLImage": "https://cdn.tgdd.vn/Products/Images/42/153856/iphone-11-xanh-la-1-1-org.jpg",
        "price": "15.490.000",
        "discountPrice": "15.190.000",
        "discription": "Apple đã chính thức trình làng bộ 3 siêu phẩm iPhone 11, trong đó phiên bản iPhone 11 64GB có mức giá rẻ nhất nhưng vẫn được nâng cấp mạnh mẽ như iPhone Xr ra mắt trước đó.",
        "createTime": "11/2019"
    },
    {
        "name": "Reno6 5G",
        "type": "OPPO",
        "URLImage": "https://cdn.tgdd.vn/Products/Images/42/236186/oppo-reno6-bac-1-org.jpg",
        "price": "12.990.000",
        "discountPrice": "11.990.000",
        "discription": "Smartphone mới mang tên OPPO Reno6 với hàng loạt cải tiến mới về ngoại hình bên ngoài lẫn hiệu năng bên trong, mang đến trải nghiệm vượt bật cho người dùng.",
        "createTime": "07/2021"
    },
    {
        "name": "Vivo V23e",
        "type": "Vivo",
        "URLImage": "https://cdn.tgdd.vn/Products/Images/42/245607/vivo-v23e-xanh-1.jpg",
        "price": "8.490.000",
        "discountPrice": "7.990.000",
        "discription": "Vivo V23e - sản phẩm tầm trung được đầu tư lớn về khả năng selfie cùng ngoại hình mỏng nhẹ, bên cạnh thiết kế vuông vức theo xu hướng hiện tại thì V23e còn có hiệu năng tốt và một viên pin có khả năng sạc cực nhanh.",
        "createTime": "11/2021"
    },
    {
        "name": "Xiaomi 11T 5G 256GB",
        "type": "Xiaomi",
        "URLImage": "https://cdn.tgdd.vn/Products/Images/42/251216/iaomi-11t-xanh-duong-1.jpg",
        "price": "11.990.000",
        "discountPrice": "11.490.000",
        "discription": "Xiaomi 11T 5G sở hữu màn hình AMOLED, viên pin siêu khủng cùng camera độ phân giải 108 MP, chiếc smartphone này của Xiaomi sẽ đáp ứng mọi nhu cầu sử dụng của bạn, từ giải trí đến làm việc đều vô cùng mượt mà.",
        "createTime": "10/2021"
    },
    {
        "name": "Realme 9i",
        "type": "Realme",
        "URLImage": "https://cdn.tgdd.vn/Products/Images/42/262649/realme-9i-xanh-1.jpg",
        "price": "6.490.000",
        "discountPrice": "5.990.000",
        "discription": "Realme 9i được trang bị CPU Snapdragon 680 mang lại hiệu năng ổn định cho các tác vụ cơ bản. Con chip này được sản xuất trên tiến trình 6 nm tiên tiến nên nó có khả năng tiết kiệm năng lượng khá ấn tượng.",
        "createTime": "1/2022"
    },
    {
        "name": "OPPO A95",
        "type": "OPPO",
        "URLImage": "https://cdn.tgdd.vn/Products/Images/42/251703/oppo-a95-4g-bac-1-1.jpg",
        "price": "6.990.000",
        "discountPrice": "6.490.000",
        "discription": "OPPO A95 4G với giá thành phải chăng tập trung vào thiết kế năng động, sạc nhanh và hiệu năng đa nhiệm ấn tượng sẽ giúp cho cuộc sống của bạn thêm phần hấp dẫn, ngập tràn niềm vui.",
        "createTime": "11/2021"
    },
    {
        "name": "iPhone 13 128GB",
        "type": "Apple",
        "URLImage": "https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-xanh-1.jpg",
        "price": "24.990.000",
        "discountPrice": "23.490.000",
        "discription": "Một siêu phẩm mới iPhone 13 - điện thoại có nhiều cải tiến thú vị sẽ mang lại những trải nghiệm hấp dẫn nhất cho người dùng.",
        "createTime": "09/2021"
    },
    {
        "name": "Samsung Galaxy A22",
        "type": "Samsung",
        "URLImage": "https://cdn.tgdd.vn/Products/Images/42/237603/samsung-galaxy-a22-4g-mint-gc-org.jpg",
        "price": "5.890.000",
        "discountPrice": "5.590.000",
        "discription": "Galaxy A22 sở hữu viên pin đầy năng suất, hiệu năng gaming mạnh mẽ và màn hình lớn có khả năng hiển thị tốt.",
        "createTime": "06/2021"
    },
    {
        "name": "Vivo V21 5G ",
        "type": "Vivo",
        "URLImage": "https://cdn.tgdd.vn/Products/Images/42/238047/vivo-v21-5g-xanh-den-1-org.jpg",
        "price": "9.990.000",
        "discountPrice": "9.490.000",
        "discription": "Chụp selfie bùng nổ trong đêm, thiết kế mới hiện đại đón đầu xu hướng, cùng với đó là tốc độ kết nối mạng 5G hàng đầu, tất cả những tính năng ấn tượng này đều có trong Vivo V21 5G",
        "createTime": "05/2021"
    }
]`
export default LIST_PRODUCE_JSON;