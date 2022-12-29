import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import "./product.style.css";
import { IComment } from "../../lib/utils/interface/comment";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/redux-hook";
import { getProduct, selectProductDetail } from "../../lib/store/product";
import { getAllComment, selectCommnets } from "../../lib/store/comment/comment";
import { selectCurrentUser } from "../../lib/store/user/user";
import { addItemToCart } from "../../lib/store/cart";
import authAxios from "../../service/authAxios"
import Comment from "../../components/comment/comment";

interface Props {}

const ProductDetailPage: React.FC<Props> = () => {
  const params = useParams();
  const { id } = useParams();
  const [rate, setRate] = React.useState(0);
  const [content, setContent] = React.useState<string>("");
  const [disable, setDisable] = React.useState(true);
  const [comments, setComments] = React.useState<IComment[]>([]);
  const dispatch = useAppDispatch();

  const product = useAppSelector(selectProductDetail);
  const commentlist = useAppSelector(selectCommnets);

  // eslint-disable-next-line array-callback-return
  const commentFilter = commentlist.filter(function (comment) {
    if (id) {
      return comment.book.bookcode === parseInt(id);
    }
  });
  const currentUser = useAppSelector(selectCurrentUser);
  const addToCart = () => {
    product && dispatch(addItemToCart({ product }));
  };

  const onRateChange = (event: React.SyntheticEvent, value: number | null) => {
    if (value) {
      setRate(value);
    }
  };

  const resetCommetInput = React.useCallback(() => {
    setContent("");
    setDisable(true);
    setRate(0);
  }, []);

  const onChangeCommentContent = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = e.target;

    if (value) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    setContent(value);
  };

  const handleAddComment = async () => {
    try {
      if (id) {
        const idInt = parseInt(id);
        const { data } = await authAxios.post("/comment", {
          content,
          rate,
          bookcode: idInt,
        });

        setComments((preState) => [...preState, data]);
        resetCommetInput();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {

      dispatch(getProduct(params.id));
      dispatch(getAllComment());
    }
  }, [dispatch, params]);

  return (
    <section className="section-content padding-y bg">
      <div className="container">
        <div className="card">
          <div className="row no-gutters">
            <aside className="col-md-6">
              <article className="gallery-wrap">
                <div className="img-big-wrap">
                  <a href="#!">
                    <img src={product?.image?.path} alt="" />
                  </a>
                </div>
              </article>
            </aside>
            <main className="col-md-6 border-left">
              <article className="content-body">
                <h2 className="title">{product?.title}</h2>
                <div className="mb-3">
                  <var className="price h4">${product?.price}</var>
                </div>
                <p>{product?.description}</p>
                {currentUser?.id && (
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={addToCart}
                      type="button"
                      className="btn  btn-primary"
                    >
                      <span className="text">Add to cart</span>
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                    <Link to={`/cart`} className={"btn btn-success"}>
                      <span className="text">View Cart</span>
                      <i className="fas fa-eye"></i>
                    </Link>
                  </div>
                )}
              </article>
            </main>
          </div>
        </div>
      </div>
      <br />
      <Box
        sx={{ textAlign: "left", marginTop: 6 }}
        className="col-md-8 offset-md-2"
      >
        {commentFilter.length ? (
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ marginBottom: 2 }}
          >
            Customer Reviews
          </Typography>
        ) : null}

        {commentFilter.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </Box>
      {currentUser?.id && (
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <article className="box mb-3">
              <Typography gutterBottom variant="h6" component="div">
                Add a comment
              </Typography>
              <Box component="form">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" component="div">
                    Rate this Book ?
                  </Typography>
                  <Rating
                    value={rate}
                    sx={{ marginLeft: 3 }}
                    onChange={onRateChange}
                  />
                </Box>
                <TextField
                  margin="normal"
                  fullWidth
                  id="add-comment"
                  name="add-comment"
                  multiline
                  minRows={5}
                  maxRows={10}
                  placeholder="Write a comment..."
                  value={content}
                  onChange={onChangeCommentContent}
                />
                <Button
                  variant="contained"
                  sx={{ marginTop: "24px" }}
                  disabled={disable}
                  onClick={handleAddComment}
                >
                  Add my comment
                </Button>
              </Box>
            </article>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetailPage;
