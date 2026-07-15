import { Controller, Get, Param, ParseIntPipe, Query, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get('search')
    searchProducts(@Query('q') query: string) {
        return this.productsService.search(query);
    }

    @Get('categories')
    getCategories() {
        return this.productsService.getCategories();
    }

    @Get('category/:category')
    getByCategory(@Param('category') category: string) {
        return this.productsService.getByCategory(category);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    @Post("import")
    importProducts(){
        return this.productsService.importProducts();
    }
}