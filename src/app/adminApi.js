import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
    reducerPath: "adminApi",
    //   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }), // json-server url
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.12.51:9000/",
        prepareHeaders: (headers) => {
          const token = localStorage.getItem("token");
          if (token) {
            console.log("Setting Authorization header");
            headers.set("Authorization", `Bearer ${token}`);
          }
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),

    tagTypes: ["Admins"],

    endpoints: (builder) => ({

        //login of super admin
        loginSuperAdmin: builder.mutation({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                body: {
                    email,
                    password
                }
            })
        }),

        // ✅ Get All Admins
        // getAdmins: builder.query({
        //     query: () => "/admins",
        //     providesTags: ["Admins"],
        // }),

        //get all company details
        getCompanies: builder.query({
            query: () => ({
              url: '/api/get/all/company',
              method: 'GET',
            }),
            providesTags: ["Admins"],
          }),
          

        // ✅ Get Single Admin by ID
        // getAdmin: builder.query({
        //     query: (id) => `/admins/${id}`,
        //     providesTags: ["Admins"],
        // }),

        getCompany: builder.query({
            query: (id) => ({
                url: `api/get/company/${id}`,
                method: 'GET',
            }),
            providesTags: ["Admins"],
        }),        

        // ✅ Add New Admin (POST) and company
        addAdmin: builder.mutation({
            query: (newAdmin) => ({
                url: "/api/register/company",
                method: "POST",
                body: newAdmin,
            }),
            invalidatesTags: ["Admins"], // naye admin ke baad refetch
        }),

        // ✅ Update Existing Admin (POST but with ID)
        updateAdmin: builder.mutation({
            query: (updatedData) => ({
                url: "/api/register/company", // id ke upar POST karna
                method: "POST",
                body: updatedData,
            }),
            invalidatesTags: ["Admins"], // update ke baad refetch
        }),

    }),
});

// ✅ Exports
export const {
    useGetCompaniesQuery,
    useGetCompanyQuery,
    useAddAdminMutation,
    useUpdateAdminMutation,
    useLoginSuperAdminMutation
} = adminApi;
