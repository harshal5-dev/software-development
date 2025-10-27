package practice;

public class Practice2 {

    static int countGreaterThenItSelf(int[] A) {
        int maxValue = Integer.MIN_VALUE;
        int ans = 0;

        for (int ele : A) {
            maxValue = Math.max(maxValue, ele);
        }

        for (int ele : A) {
            if (ele < maxValue) {
                ans++;
            }
        }

        return ans;
    }

    static int goodPair(int[] A, int B) {
        int N = A.length;

        for (int i = 0; i < N; i++) {
            for (int j = i + 1; j < N; j++) {
                if (A[i] + A[j] == B) {
                    return 1;
                }
            }
        }

        return 0;
    }

    static void reverseInRange(int[] A, int B, int C) {
        int i = B;
        int j = C;

        while (i < j) {
            int temp = A[i];
            A[i] = A[j];
            A[j] = temp;
            i++;
            j--;
        }
    }

    static int[] reverseArray(final int[] A) {
        int N = A.length;
        int[] ans = new int[N];

        for (int index = 0; index < N; index++) {
            ans[index] = A[N - 1 - index];
        }

        return ans;
    }

    static int[] roateArray(int[] A, int B) {
        int N = A.length;
        B %= N;

        reverseInRange(A, 0, N - 1);
        reverseInRange(A, 0, B - 1);
        reverseInRange(A, B, N - 1);

        return A;
    }
}
