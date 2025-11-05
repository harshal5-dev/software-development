package practice;

import java.util.ArrayList;

public class Practice9 {

    static ArrayList<Integer> majorityElements2(int[] A) {
        int N = A.length;
        int ele1 = 0;
        int ele2 = 0;
        int freq1 = 0;
        int freq2 = 0;
        ArrayList<Integer> result = new ArrayList<>();

        for (int index = 0; index < N; index++) {
            if (freq1 == 0) {
                ele1 = A[index];
                freq1++;
            } else if (A[index] == ele1) {
                freq1++;
            } else if (freq2 == 0) {
                ele2 = A[index];
                freq2++;
            } else if (A[index] == ele2) {
                freq2++;
            } else {
                freq1--;
                freq2--;
            }
        }

        if (freq1 > (N / 3)) {
            result.add(ele1);
        }
        if (freq2 > (N / 3)) {
            result.add(ele2);
        }

        return result;
    }

    static int[] evenIndexSum(int[] A) {
        int N = A.length;
        int[] prefixEven = new int[N];

        prefixEven[0] = A[0];

        for (int index = 1; index < N; index++) {
            prefixEven[index] =
                prefixEven[index - 1] + ((index & 1) == 0 ? A[index] : 0);
        }

        return prefixEven;
    }

    static int[] sumOfEvenIndices(int[] A, int[][] B) {
        int M = B.length;
        int[] prefixEven = evenIndexSum(A);
        int[] result = new int[M];

        for (int index = 0; index < M; index++) {
            int left = B[index][0];
            int right = B[index][1];

            int sum = prefixEven[right];

            if (left > 0) {
                sum -= prefixEven[left - 1];
            }

            result[index] = sum;
        }

        return result;
    }

    static int[] oddIndexSum(int[] A) {
        int N = A.length;
        int[] prefixOdd = new int[N];

        for (int index = 1; index < N; index++) {
            prefixOdd[index] =
                prefixOdd[index - 1] + ((index & 1) == 1 ? A[index] : 0);
        }

        return prefixOdd;
    }

    static int[] sumOfOddIndices(int[] A, int[][] B) {
        int M = B.length;
        int[] result = new int[M];
        int[] prefixOdd = oddIndexSum(A);

        for (int index = 0; index < M; index++) {
            int left = B[index][0];
            int right = B[index][1];
            int sum = prefixOdd[right];

            if (left > 0) {
                sum -= prefixOdd[left - 1];
            }

            result[index] = sum;
        }

        return result;
    }

    static int specialIndex(int[] A) {
        int N = A.length;
        int[] prefixEven = evenIndexSum(A);
        int[] prefixodd = oddIndexSum(A);
        int result = 0;

        for (int index = 0; index < N; index++) {
            int sumEven = prefixodd[N - 1] - prefixodd[index];
            int sumOdd = prefixEven[N - 1] - prefixEven[index];

            if (index > 0) {
                sumEven += prefixEven[index - 1];
                sumOdd += prefixodd[index - 1];
            }

            if (sumEven == sumOdd) {
                result++;
            }
        }

        return result;
    }

    static int majorityElement(int[] A) {
        int ele = A[0];
        int freq = 0;
        int N = A.length;

        for (int index = 1; index < N; index++) {
            if (freq == 0) {
                ele = A[index];
                freq++;
            } else if (A[index] == ele) {
                freq++;
            } else {
                freq--;
            }
        }

        return ele;
    }
}
