include void main()
{
    int n, i, j, k, l, in;
    while (scanf("%d", &n) && n)
    {
        int x[n][n];
        for (i = 0; i < n; i++)
        {
            for (j = 0; j < n; j++)
            {
                if (i == j)
                {
                    in = 2;
                    x[i][j] = 1;
                    for (k = i - 1; k >= 0; k--)
                    {
                        x[k][j] = in;
                        in++;
                    }
                    in = 2;
                    for (l = i + 1; l < n; l++)
                    {
                        x[l][j] = in;
                        in++;
                    }
                }
            }
        }
        for (i = 0; i < n; i++)
        {
            for (j = 0; j < n; j++)
            {
                if (j == 0)
                    printf(" %d", x[i][j]);
                else
                    printf(" %d", x[i][j]);
            }
            printf("\n");
        }
    }
    printf("\n");
}