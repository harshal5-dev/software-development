package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L13_Bit_Manipulations_2.Lecture;

public class SetBit {

  static int setIthBit(int A, int B) {
    return A | (1 << B);
  }
}
