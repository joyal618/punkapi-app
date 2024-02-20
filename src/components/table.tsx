import React, { useEffect, useCallback } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Switch } from "@progress/kendo-react-inputs";
import { PagerTargetEvent } from "@progress/kendo-react-data-tools";
import {
  Grid,
  GridColumn as Column,
  GridPageChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";

import fetchData from "../common/apiHelper";
import "./style.css";
import { useBeerStore } from "../store";
import { PageState } from "../common/interface";

const initialDataState: PageState = { skip: 0, take: 10 };

const Table = () => {
  const beers = useBeerStore((state) => state.beers);
  const setBeers = useBeerStore((state) => state.setBeers);
  const [searchText, setSearchText] = React.useState("");
  const [showHighABV, setShowHighABV] = React.useState(false);
  const [page, setPage] = React.useState<PageState>(initialDataState);
  const [pageSizeValue, setPageSizeValue] = React.useState<
    number | string | undefined
  >();
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetchData({ highABV: showHighABV, searchText, page }),
  });

  const handler = useCallback(
    debounce((text) => {
      setSearchText(text);
      setPage({
        ...page,
        skip: 0,
      });
    }, 1000),
    []
  );

  const onSearchTextChange = (e) => {
    handler(e.target.value);
  };

  useEffect(() => {
    setBeers(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page]);

  const pageChange = (event: GridPageChangeEvent) => {
    const targetEvent = event.targetEvent as PagerTargetEvent;
    const take = event.page.take;

    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }
    setPage({
      ...event.page,
      take,
    });
  };

  const loadingPanel = (
    <div className="k-loading-mask">
      <span className="k-loading-text">Loading</span>
      <div className="k-loading-image"></div>
      <div className="k-loading-color"></div>
    </div>
  );

  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold text-gray-600 mb-5">Beer List</h1>
      {isFetching && <div className="">{loadingPanel}</div>}
      <Grid
        style={{ height: "500px", width: "1320px" }}
        data={beers}
        skip={page.skip}
        take={page.take}
        total={325}
        pageable={{
          buttonCount: 4,
          pageSizes: [5, 10, 15],
          pageSizeValue: pageSizeValue,
        }}
        onPageChange={pageChange}
      >
        <GridToolbar>
          <Input
            onChange={onSearchTextChange}
            style={{
              border: "2px solid #ccc",
              boxShadow: "inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)",
              width: "170px",
              height: "30px",
              marginRight: "10px",
            }}
            placeholder="Search beer name"
          />
          <div className="flex items-center gap-2">
            <p>ABV Above 8%:</p>
            <Switch
              onLabel={"Yes"}
              offLabel={"No"}
              checked={showHighABV}
              onChange={(event: any) => {
                setShowHighABV(event.target.value);
                setPage({
                  ...page,
                  skip: 0,
                });
              }}
            />
          </div>
        </GridToolbar>
        <Column field="id" title="Id" width="50px" />
        <Column field="name" title="Name" width="250px" />
        <Column field="tagline" title="Tagline" width="250px" />
        <Column field="abv" title="ABV" width="250px" />
        <Column
          field="attenuation_level"
          title="Attenuation Level"
          width="250px"
        />
        <Column field="first_brewed" title="First Brewed" width="250px" />
      </Grid>
    </div>
  );
};

export default Table;
