import { storageKeys } from "@/const/storage_keys";
import { Response, request } from "../service";
import "../service";
import { SubcategoriaBase, SubcategoriaConProductos, SubcategoriaPaginada } from "./interface";

export async function GetSubcategoriasBase(): Promise<Response<SubcategoriaBase[]>> {
    try {
        var token = localStorage.getItem(storageKeys.token);
        return await request({
            method: "GET",
            endpoint: `/get-subcategories`,
            headers: {
                authorization: `bearer ${token}`,
            },
        });
    } catch (err) {
        return {
            status: 500,
            errors: `${err}`,
        };
    }
}

export async function GetSubcategoriasConProductos(): Promise<Response<SubcategoriaConProductos[]>> {
    try {
        var token = localStorage.getItem(storageKeys.token);
        return await request({
            method: "GET",
            endpoint: `/get-subcategories-with-products`,
            headers: {
                authorization: `bearer ${token}`,
            },
        });
    } catch (err) {
        return {
            status: 500,
            errors: `${err}`,
        };
    }
}

export async function GetSubcategoriasPaginadas(id: string, page: number): Promise<Response<SubcategoriaPaginada>> {
    try {
        var token = localStorage.getItem(storageKeys.token);
        return await request({
            method: "GET",
            endpoint: `/${id}?pageNumber=${page}&pageSize=24`,
            headers: {
                authorization: `bearer ${token}`,
            },
        });
    } catch (err) {
        return {
            status: 500,
            errors: `${err}`,
        };
    }
}