from datetime import datetime
from enum import Enum
from re import I

from sqlalchemy import String, DateTime, Boolean, Integer, Float
from sqlalchemy.dialects.postgresql import JSONB

from sqlalchemy import ForeignKey, String, Integer, Float, Text
from sqlalchemy.orm import relationship, Mapped, mapped_column, registry
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Order(Base):
    __tablename__ = "order"

    id: Mapped[int] = mapped_column(primary_key=True)
    recipient_phone: Mapped[str | None] = mapped_column(String, nullable=True)
    recipient_name: Mapped[str | None] = mapped_column(String, nullable=True)
    recipient_tg: Mapped[str] = mapped_column(String)
    delivery_address: Mapped[str] = mapped_column(String)
    comment: Mapped[str | None] = mapped_column(String, nullable=True)
    total_price: Mapped[float] = mapped_column(Float)
    order_type: Mapped[str] = mapped_column(Text)  # ONLINE or OFFLINE
    status: Mapped[str] = mapped_column(Text)

    items: Mapped[list["OrderItem"]] = relationship(back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"

    order_id: Mapped[int] = mapped_column(ForeignKey("order.id"), primary_key=True)
    product_variant_id: Mapped[int] = mapped_column(ForeignKey("products_models.id"), primary_key=True)
    quantity: Mapped[int] = mapped_column(Integer)
    price: Mapped[float] = mapped_column(Float)

    order: Mapped["Order"] = relationship(back_populates="items")
    product_model: Mapped["ProductModel"] = relationship(back_populates="order_items")


class Brand(Base):
    __tablename__ = "brands"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String)

    models: Mapped[list["ProductModel"]] = relationship(back_populates="brand")


class ProductModel(Base):
    __tablename__ = "products_models"

    id: Mapped[int] = mapped_column(primary_key=True)
    model: Mapped[str] = mapped_column(String)
    brand_id: Mapped[int] = mapped_column(ForeignKey("brands.id"))
    color: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)
    type: Mapped[str] = mapped_column(Text)  # ACS, SHOES, WEAR

    brand: Mapped["Brand"] = relationship(back_populates="models")
    variants: Mapped[list["ProductVariant"]] = relationship(back_populates="product_model")
    order_items: Mapped[list["OrderItem"]] = relationship(back_populates="product_model")


class ProductVariant(Base):
    __tablename__ = "products_variants"
    
    id: Mapped[int] = mapped_column(primary_key=True) 
    product_model_id: Mapped[int] = mapped_column(ForeignKey("products_models.id", ondelete="CASCADE"))
    size:       Mapped[str] = mapped_column(String)
    size_grid:  Mapped[str | None] = mapped_column(String, nullable=True)
    price:      Mapped[float] = mapped_column(Float)
    stock:      Mapped[int] = mapped_column(Integer)

    product_model: Mapped["ProductModel"] = relationship(back_populates="variants")


class ProductImage(Base):
    __tablename__ = "products_images"
    
    product_model_id: Mapped[int] = mapped_column(ForeignKey('products_models.id', ondelete="CASCADE"))
    photo_path: Mapped[str] = mapped_column(nullable=False, primary_key=True)